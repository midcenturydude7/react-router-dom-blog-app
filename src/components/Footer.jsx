import React from "react";
import { useStoreState } from "easy-peasy";

function Footer() {
  const postCount = useStoreState((state) => state.postCount);
  return (
    <footer className="Footer">
      {postCount === 1 ? (
        <p>{postCount} blog post</p>
      ) : postCount > 1 ? (
        <p>{postCount} blog posts</p>
      ) : (
        <p>You have not blog entries yet!</p>
      )}
    </footer>
  );
}

export default Footer;
