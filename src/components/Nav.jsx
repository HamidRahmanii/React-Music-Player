import React from "react";
import { FaMusic } from "react-icons/fa";

import "../styles/_nav.scss";

const Nav = ({ libraryStatus, setLibraryStatus, colors }) => {
  return (
    <nav>
      <h1 className="logo" style={{ color: `${colors[2]}` }}>
        Apple Music
      </h1>
      <p style={{ color: `${colors[1]}` }}>Made with ♥️ by Hamid Rahmani</p>
      <button onClick={() => setLibraryStatus(!libraryStatus)}>
        <span>Library</span> <FaMusic size={12} />
      </button>
    </nav>
  );
};

export default Nav;
