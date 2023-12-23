import { useEffect, useRef } from "react";
import { createNewPost } from "../Actions/Post";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

const CreatePost = () => {
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.posts);
  const alert = useAlert();
  const postTitleElement = useRef();
  const postBodyElement = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = postTitleElement.current.value;
    const caption = postBodyElement.current.value;
    dispatch(createNewPost(title, caption));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, message, dispatch]);

  return (
    <div className="createe-post-container">
      <center>
        <h3>Create Post</h3>
      </center>
      <form className="create-post" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Post Title
          </label>
          <input
            type="text"
            ref={postTitleElement}
            className="form-control"
            id="title"
            placeholder="How are you feeling today..."
          />
        </div>

        <div className="mb-3">
          <label htmlFor="body" className="form-label">
            Post Content
          </label>
          <textarea
            type="text"
            ref={postBodyElement}
            rows="4"
            className="form-control"
            id="body"
            placeholder="Tell us more about it"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
