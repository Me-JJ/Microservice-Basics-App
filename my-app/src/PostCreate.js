import React, { useState } from "react";
import axios from "axios";

const PostCreate = () => {
  const [title, setTitle] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:4000/posts", {
      title,
    });

    setTitle("");
    window.location.reload(true);
  };
  return (
    <div className="mt-3">
      <h3>Create Post</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label className="fs-2 fw-bold">Title</label>
          <input
            className="form-control mt-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default PostCreate;
