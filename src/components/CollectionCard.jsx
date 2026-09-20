import { useDispatch } from "react-redux";
import { removeCollection } from "../redux/features/collectionSlice";

const CollectionCard = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <article className="pin-card">
      <a target="_blank" rel="noreferrer" className="h-full" href={item.url}>
        {item.type === "photo" || item.type === "gif" ? (
          <img
            className="pin-image"
            src={item.src}
            alt={item.title || "Saved media"}
            loading="lazy"
          />
        ) : null}
        {item.type === "video" ? (
          <video
            className="pin-video"
            autoPlay
            loop
            muted
            poster={item.thumbnail}
            src={item.src}
          />
        ) : null}
      </a>
      <div className="pin-caption">
        <h2 className="h-14 overflow-hidden text-lg font-semibold capitalize">
          {item.title}
        </h2>
        <button
          onClick={() => dispatch(removeCollection(item.id))}
          className="remove-pin"
        >
          Remove
        </button>
      </div>
    </article>
  );
};

export default CollectionCard;
