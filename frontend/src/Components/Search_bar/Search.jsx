import Input from "../../Common_components/Common_INPUT/Input";
import React, { forwardRef } from "react";

const Search = forwardRef((props, ref) => {
  return (
    <input
      ref={ref}
      type="text"
      placeholder="Search anime..."
      className="search-input"
    />
  );
});

export default Search;
