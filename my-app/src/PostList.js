import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
  const [posts, setPosts] = useState({});
  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://posts.com/posts");
      // console.log("get /posts -> ", res);
      setPosts(res.data);
    } catch ({ response }) {
      if (response) {
        const errMsg = response.response.data.error;
        console.log(errMsg);
      } else {
        console.log("Query bus is down.");
      }
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const post_arr = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-evenly ">
      {post_arr}
    </div>
  );
};

export default PostList;
