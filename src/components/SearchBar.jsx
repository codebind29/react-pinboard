import { useState } from "react";
import { useDispatch } from 'react-redux'
import { setQuery } from '../redux/features/searchSlice'

const SearchBar = () => {
  const [text, setText] = useState("");

 const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setQuery(text))
    setText("");
  };

  return (
    <form onSubmit={submitHandler} className="search-form">
        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          required
          className="search-input"
          type="text"
          placeholder="Search anything..."
        />
        <button type="submit">
          Search
        </button>
    </form>
  );
};

export default SearchBar;
