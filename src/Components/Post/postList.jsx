import React from "react";
import { useState, useEffect } from "react";
import Post from "./post";

export default function PostList() {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const fetchPosts = () => {
      fetch("http://localhost:1337/api/posts", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((responseData) => {
          setPostList(responseData.data);

          setPostList((prevPostList) => {
            const sortedList = [...prevPostList].sort((a, b) => {
              const dateA = new Date(a.attributes.createdAt);

              const dateB = new Date(b.attributes.createdAt);

              return dateB - dateA;
            });

            return sortedList;
          });
        });
    };

    // Fetch posts initially
    fetchPosts();

    // Fetch posts every 1 minute (adjust the interval as needed)
    const interval = setInterval(fetchPosts, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h2>Liste des posts actuels:</h2>
      {postList.map((post, index) => (
        <Post data={post} key={index} />
      ))}
    </>
  );
}
