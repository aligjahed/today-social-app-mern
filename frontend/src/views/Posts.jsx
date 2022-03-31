import { useDispatch, useSelector } from "react-redux";
import { getAll, reset } from "../features/post/postSlicer";
import { useEffect, useState } from "react";
import { Header } from "../components/components";

const Posts = () => {
  const dispatch = useDispatch();
  const { isError, isLoading, isSuccess, message, posts } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    dispatch(getAll());

    return () => dispatch(reset());
  }, [isError, message]);

  return (
    <div>
      <Header />
      <p>
        {posts.length > 0 && (
          <div>
            <h1>{posts[0][0].postTitle}</h1>
            <p>{posts[0][0].postDesc}</p>
            <img src={posts[0][0].postPic} alt="pic" />
          </div>
        )}
      </p>
    </div>
  );
};
export default Posts;
