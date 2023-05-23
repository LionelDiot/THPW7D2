import React from "react";
import { useEffect } from "react";

export default function Post(data) {
  const post = data.data.attributes;
  useEffect(() => {console.log(post.user)
  }, []);
  return (
  <>
  <hr/>
    <p>{post.text}</p>
    <p>nb likes: {post.like}</p>
  </>
  );
};
