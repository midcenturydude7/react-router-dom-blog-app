import React from "react";
import { DataProvider } from "../context/DataContext";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="App">
      <DataProvider>
        <Header title="React JS Blog" />
        <Nav />
        <Outlet />
        <Footer />
      </DataProvider>
    </div>
  );
}

export default Layout;
