import React from "react";

export default function CommentList({ comments }) {
  const cmt_arr = comments.map((comment) => {
    let content;

    if (comment.status === "approved") {
      content = comment.content;
    }
    if (comment.status === "pending") {
      content = "Moderating Comment";
    }
    if (comment.status === "rejected") {
      content = "Rejected Comment, no oranges allowed!";
    }

    return <li key={comment.id}>{content}</li>;
  });
  return <ul className="border border-green mt-2 ">{cmt_arr}</ul>;
}
