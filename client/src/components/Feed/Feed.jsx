import "./feed.css";
import { Thought } from "../Thought/Thought";

export const Feed = (props) => {
  if (props.loadingState) {
    return <p className="loading-p">Loading ...</p>;
  }

  //<button /*onClick={this.getData}*/>Try again</button>
  if (props.errorState) {
    return (
      <div className="feed">
        <p className="error-p">There was an error loading posts</p>
      </div>
    );
  }

  // takes the post data from the props and maps it down into individual thought components
  if (props.dataState) {
    return (
      <div className="feed">
        {props.dataState["data"].map((post) => (
          <Thought
            key={post["_id"]}
            _id={post["_id"]}
            username={post["user"]["username"]}
            displayName={post["user"]["displayName"]}
            profilePic={post["user"]["profilePic"]}
            text={post["text"]}
            image={post["image"]}
            likes={post["likes"]}
            reposts={post["reposts"]}
            replies={post["replies"]}
            createdAt={post["createdAt"]}
          ></Thought>
        ))}
      </div>
    );
  }
};
