import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <input
    type="text"
    className="shadow w-[68%] appearance-none border rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
    placeholder="Search posts..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
);

export default SearchBar;
