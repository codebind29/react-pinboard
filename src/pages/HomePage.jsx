import SearchBar from "../components/SearchBar";
import Tabs from "../components/Tabs";
import ResultGrid from "../components/ResultGrid";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { query } = useSelector((store) => store.search);

  return (
    <main>
      <section className="hero">
        <p className="eyebrow">A visual search engine</p>
        <h1>Find ideas worth saving.</h1>
        <p className="muted-text">
          Search across photography, motion, and GIFs. Build your own little
          corner of the internet.
        </p>
        <SearchBar />
      </section>
      {query ? (
        <>
          <Tabs />
          <ResultGrid />
        </>
      ) : (
        <p className="status-message">
          Start with a word, a feeling, or a place.
        </p>
      )}
    </main>
  );
};

export default HomePage;
