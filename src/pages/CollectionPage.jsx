import { useDispatch, useSelector } from "react-redux";
import CollectionCard from "../components/CollectionCard";
import { clearCollection } from "../redux/features/collectionSlice";

const CollectionPage = () => {
  const items = useSelector((state) => state.collection.items);
  const dispatch = useDispatch();
  const removeAll = () => {
    if (
      items.length &&
      window.confirm("Remove every saved pin from your collection?")
    )
      dispatch(clearCollection());
  };

  return (
    <main className="page-content">
      <div className="collection-heading">
        <div>
          <p className="eyebrow">Your inspiration</p>
          <h1>Saved pins</h1>
          <p className="muted-text">
            {items.length} saved {items.length === 1 ? "pin" : "pins"}
          </p>
        </div>
        <button
          className="clear-button"
          disabled={!items.length}
          onClick={removeAll}
        >
          Remove all
        </button>
      </div>
      {items.length ? (
        <div className="masonry-grid">
          {items.filter(Boolean).map((item) => (
            <CollectionCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-mark">+</div>
          <h2>Your board is empty</h2>
          <p>Save a few ideas and they will appear here.</p>
        </div>
      )}
    </main>
  );
};

export default CollectionPage;
