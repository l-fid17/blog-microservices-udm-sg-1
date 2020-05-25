const express = require("express");
const bodyParse = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParse.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
    console.log("Query::PostCreated ", posts[id]);
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
    console.log("Query::CommentCreated ", {});
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;
    comment.content = content;

    console.log("Query::CommentUpdated ", comment);
  }

  console.log(posts);
  res.send({});
});

app.listen(4002, () => {
  console.log("listening on 4002");
});
