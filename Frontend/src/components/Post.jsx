import { AiFillDelete } from "react-icons/ai";
import "./Post.css";
import { FaRegHeart } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";

const Post = ({ post }) => {
  return (
    <div className="card post-card" style={{ width: "30rem" }}>
      <div className="profile">
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          alt=""
        />
        <h5>{post.owner.name}</h5>
      </div>
      <div className="card-body">
        <h5 className="card-title">
          {post.title}
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            onClick={() => deletePost(post.id)}
          >
            <AiFillDelete />
          </span>
        </h5>
        <p className="card-text">{post.caption}</p>

        <div className="alert alert-success reactions" role="alert"></div>
        <div className="post-footer">
          <FaRegHeart />
          <FaRegCommentAlt />
        </div>
      </div>
    </div>
  );
};

export default Post;
