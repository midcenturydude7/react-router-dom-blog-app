import React from "react";
import { useStoreState } from "easy-peasy";

function Footer() {
  const postCount = useStoreState((state) => state.postCount);
  return (
    <footer className="Footer">
      {postCount.length ? (
        <p>{postCount} blog posts</p>
      ) : (
        <p>You have no blog entries yet!</p>
      )}
    </footer>
  );
}

export default Footer;
