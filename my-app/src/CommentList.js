import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CommentList({ postId }) {
  const [list, setList] = useState({});

  const fetchAllComments = async () => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );

    setList(res.data);
  };

  useEffect(() => {
    fetchAllComments();
  }, []); // eslint-disable-next-line

  const cmt_arr = Object.values(list).map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });
  return <ul className="border border-green mt-2 ">{cmt_arr}</ul>;
}
