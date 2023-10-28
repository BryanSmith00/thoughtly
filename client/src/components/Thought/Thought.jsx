import "./thought.css";

import { Link } from "react-router-dom";
import axios from "axios";

export const Thought = (props) => {
  const toggleLike = async () => {
    try {
      const like = await axios
        .post(
          "http://localhost:4000/like",
          { post_id: props._id },
          { withCredentials: true }
        )
        .catch((error) => {
          console.log(error);
        });

      // thought should use the likes, reposts, and replies as state so it can be rerendered on update
      if (document.getElementById("likes").getAttribute("fill") === "none")
        document.getElementById("likes").setAttribute("fill", "white");
      else document.getElementById("likes").setAttribute("fill", "none");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="post-container">
      <div className="post-header">
        <img src={props.profilePic} alt="" className="profile-image"></img>

        <div className="post-header-info">
          <Link to={`/user/${props.username}`}>{props.displayName}</Link>{" "}
          <span>@{props.username}</span>
          <span>{props.createdAt.slice(0, 10)}</span>
          <p>{props.text}</p>
        </div>
      </div>

      <div className="post-img-wrap">
        <img src={props.image} alt="" className="post-img"></img>
      </div>

      <div className="post-info-counts">
        <div className="comments">
          <svg
            className="feather feather-message-circle sc-dnqmqq jxshSx"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
          <div className="comment-count">{props.replies.length}</div>
        </div>

        <div className="reposts">
          <svg
            className="feather feather-repeat sc-dnqmqq jxshSx"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="17 1 21 5 17 9"></polyline>
            <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
            <polyline points="7 23 3 19 7 15"></polyline>
            <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
          </svg>
          <div className="repost-count">{props.reposts.length}</div>
        </div>

        <div className="likes">
          <svg
            className="feather feather-heart sc-dnqmqq jxshSx"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            id="likes"
            onClick={() => {
              toggleLike();
            }}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <div className="likes-count">{props.likes.length}</div>
        </div>
      </div>
    </div>
  );
};
