import { useDispatch } from "react-redux";
import { addCollection } from "../redux/features/collectionSlice";

const ResultCard = ({ item }) => {
  const dispatch = useDispatch();

  const addToCollection = (item) => {
    dispatch(addCollection(item));
  };

  return (
    <article className="pin-card">
      <a target="_blank" rel="noreferrer" className="pin-media" href={item.url}>
        {item.type == "photo" ? (
          <img
            className="pin-image"
            src={item.src}
            alt={item.title || "Photo"}
            loading="lazy"
          />
        ) : (
          ""
        )}
        {item.type == "video" ? (
          <video
            className="pin-video"
            autoPlay
            loop
            muted
            src={item.src}
            poster={item.thumbnail}
          ></video>
        ) : (
          ""
        )}
        {item.type == "gif" ? (
          <img
            className="pin-image"
            src={item.src}
            alt={item.title || "GIF"}
            loading="lazy"
          />
        ) : (
          ""
        )}
      </a>
      <div className="pin-caption">
        <h2 className="text-lg font-semibold capitalize h-14 overflow-hidden">
          {item.title}
        </h2>
        <button
          onClick={() => {
            addToCollection(item);
          }}
          className="pin-action"
        >
          Save
        </button>
      </div>
    </article>
  );
};

export default ResultCard;
