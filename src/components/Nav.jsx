import React from "react";
import { FaMusic } from "react-icons/fa";

const Nav = ({ libraryStatus, setLibraryStatus, colors }) => {
  return (
    <nav>
      <h1 className="logo" style={{ color: `${colors[2]}` }}>
        Apple Music
      </h1>
      <p>Made with ♥️ by Hamid Rahmani</p>
      <button onClick={() => setLibraryStatus(!libraryStatus)}>
        <span>Library</span> <FaMusic size={12} />
      </button>
    </nav>
  );
};

export default Nav;
