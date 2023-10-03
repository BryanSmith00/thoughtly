import "./feed.css";
import { Thought } from "../Thought/Thought";

export const Feed = (props) => {
  if (props.loadingState) {
    return <p>Loading ...</p>;
  }

  if (props.errorState) {
    return (
      <p>
        There was an error loading posts
        <button /*onClick={this.getData}*/>Try again</button>
      </p>
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
