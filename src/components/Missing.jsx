import React from "react";
import { Link } from "react-router-dom";

function Missing() {
  return (
    <main className="Missing">
      <h2>Page not found</h2>
      <p>Well, that's dissapointing</p>
      <p>
        <Link to="/">Return to the Homepage</Link>
      </p>
    </main>
  );
}

export default Missing;
