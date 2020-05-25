import React from "react";

const CommentsList = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    let content;

    if (comment.status === "approved") {
      content = comment.content;
    }

    if (comment.status === "pending") {
      content = "Awaiting moderation";
    }

    if (comment.status === "rejected") {
      content = "Rejected";
    }

    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentsList;
