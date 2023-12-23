import { useEffect } from "react";
import Post from "./Post";

import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../Actions/Post";

const PostList = () => {
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
    console.log("posts");
    console.log(posts);
  }, [dispatch]);
  return (
    <>
      {posts && posts.length > 0 ? (
        posts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <div>
          <center>No Post Available</center>
        </div>
      )}
    </>
  );
};

export default PostList;
