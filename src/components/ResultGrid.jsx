import { useEffect, useRef, useState } from "react";
import { fetchPhotos, fetchVideo, fetchGif } from "../api/mediaApi";
import { useDispatch, useSelector } from "react-redux";
import ResultCard from "./ResultCard";
import {
  setLoading,
  setError,
  setResults,
  appendResults,
} from "../redux/features/searchSlice";

const ResultGrid = () => {
  const { query, activeTab, results, loading, error } = useSelector(
    (store) => store.search,
  );
  const dispatch = useDispatch();
  const pageRef = useRef(1);
  const sentinelRef = useRef(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!query) return;
    let cancelled = false;
    const getData = async () => {
      try {
        dispatch(setLoading());
        pageRef.current = 1;
        let data = [];
        if (activeTab === "photos") {
          const response = await fetchPhotos(query, 1);
          data = response.results.map((item) => ({
            id: item.id,
            type: "photo",
            title: item.alt_description || "Untitled photo",
            thumbnail: item.urls.small,
            src: item.urls.full,
            url: item.links.html,
          }));
        } else if (activeTab === "videos") {
          const response = await fetchVideo(query, 1);
          data = response.videos.map((item) => ({
            id: item.id,
            type: "video",
            title: item.user?.name || "Video",
            thumbnail: item.image,
            src: item.video_files?.[0]?.link,
            url: item.url,
          }));
        } else {
          const response = await fetchGif(query, 1);
          data = response.data.map((item) => ({
            id: item.id,
            type: "gif",
            title: item.title || "GIF",
            thumbnail: item.images.fixed_width.url,
            src: item.images.original.url,
            url: item.url,
          }));
        }
        if (!cancelled) {
          setHasMore(data.length > 0);
          dispatch(setResults(data));
        }
      } catch (err) {
        if (!cancelled) dispatch(setError(err.message));
      }
    };
    getData();
    return () => {
      cancelled = true;
    };
  }, [query, activeTab, dispatch]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !query) return undefined;
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting || loading || loadingMore || !hasMore) return;
        setLoadingMore(true);
        const nextPage = pageRef.current + 1;
        try {
          let data = [];
          if (activeTab === "photos") {
            const response = await fetchPhotos(query, nextPage);
            data = response.results.map((item) => ({
              id: item.id,
              type: "photo",
              title: item.alt_description || "Untitled photo",
              thumbnail: item.urls.small,
              src: item.urls.full,
              url: item.links.html,
            }));
          } else if (activeTab === "videos") {
            const response = await fetchVideo(query, nextPage);
            data = response.videos.map((item) => ({
              id: item.id,
              type: "video",
              title: item.user?.name || "Video",
              thumbnail: item.image,
              src: item.video_files?.[0]?.link,
              url: item.url,
            }));
          } else {
            const response = await fetchGif(query, nextPage);
            data = response.data.map((item) => ({
              id: item.id,
              type: "gif",
              title: item.title || "GIF",
              thumbnail: item.images.fixed_width.url,
              src: item.images.original.url,
              url: item.url,
            }));
          }
          pageRef.current = nextPage;
          setHasMore(data.length > 0);
          dispatch(appendResults(data));
        } catch (err) {
          dispatch(setError(err.message));
        } finally {
          setLoadingMore(false);
        }
      },
      { rootMargin: "500px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [query, activeTab, loading, loadingMore, hasMore, dispatch]);

  if (error)
    return (
      <p className="status-message error-message">
        Could not load results: {error}
      </p>
    );
  return (
    <section className="results-area">
      {loading && !results.length ? (
        <p className="status-message">Curating fresh results...</p>
      ) : (
        <div className="masonry-grid">
          {results.map((item) => (
            <ResultCard key={`${item.type}-${item.id}`} item={item} />
          ))}
        </div>
      )}
      <div className="load-sentinel" ref={sentinelRef}>
        {loadingMore
          ? "Loading more inspiration..."
          : results.length && !hasMore
            ? "You reached the end"
            : ""}
      </div>
    </section>
  );
};

export default ResultGrid;
