import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CollectionPage from "./pages/CollectionPage";
import Navbar from "./components/Navbar";
import ToastMessage from "./components/ToastMessage";

const App = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={`app-shell ${darkMode ? "dark-theme" : "light-theme"}`}>
      <Navbar darkMode={darkMode} onToggle={() => setDarkMode((value) => !value)} />
      <ToastMessage />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collection" element={<CollectionPage />} />
      </Routes>
    </div>
  );
};

export default App;
