import "./feed.css";
import { Thought } from "../Thought/Thought";

import { useEffect } from "react";
import axios from "axios";

export const Feed = (props) => {
  // on component mount
  useEffect(() => {
    if (!props.dataState) getData();
  });

  const getData = async () => {
    props.changeLoading(true);

    const posts = await axios
      .post("http://localhost:4000/home", {})
      .catch((error) => {
        console.error("error: ", error);
        props.changeError(error);

        props.changeLoading(false);
      });

    props.changeLoading(false);
    props.changeData(posts);
  };

  if (props.loadingState) {
    return <p>Loading ...</p>;
  }

  if (props.errorState) {
    return (
      <p>
        There was an error loading posts
        <button onClick={this.getData}>Try again</button>
      </p>
    );
  }

  // if the state has been updated by getData then we map down each post into its own thought component
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
