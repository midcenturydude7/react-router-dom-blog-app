import React from "react";
import { FaLaptop, FaTabletAlt, FaMobileAlt } from "react-icons/fa";
import DataContext from "../context/DataContext";

function Header({ title }) {
  const { width } = React.useContext(DataContext);

  return (
    <header className="Header">
      <h1>{title}</h1>
      {width < 768 ? (
        <FaMobileAlt />
      ) : width < 992 ? (
        <FaTabletAlt />
      ) : (
        <FaLaptop />
      )}
    </header>
  );
}

export default Header;
