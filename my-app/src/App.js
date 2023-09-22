import React from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

const App = () => {
  return (
    <div className="border border-info m-5 p-5">
      <h1 className="bg-info p-2">BLOG</h1>
      <PostCreate />
      <hr className="mt-3 bg-dark" />
      <PostList />
    </div>
  );
};

export default App;
