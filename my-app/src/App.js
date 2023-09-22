import React from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

const App = () => {
  return (
    <div>
      <h1 className="bg-dark p-2 text-center text-light">BLOG Page</h1>
      <div className="border border-info m-auto p-5 w-75">
        <PostCreate />
        <hr className="mt-3 bg-dark" />
        <h1 className="bg-info-subtle p-2 mb-5">Post</h1>
        <PostList />
      </div>
    </div>
  );
};

export default App;
