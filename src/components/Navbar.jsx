import { Link } from "react-router-dom";

const Navbar = ({ darkMode, onToggle }) => {
  return (
    <header className="topbar">
      <Link to="/" className="wordmark">
        pin<span>board</span>
      </Link>
      <nav className="nav-links">
        <Link to="/">Explore</Link>
        <Link to="/collection">Saved</Link>
        <button onClick={onToggle} aria-label="Toggle dark mode">
          {darkMode ? "Light" : "Dark"}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
