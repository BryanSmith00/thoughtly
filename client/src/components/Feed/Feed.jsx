import "./feed.css";
import { Thought } from "../Thought/Thought";

import { useEffect, useState } from "react";
import axios from "axios";

export const Feed = () => {
  const [state, setState] = useState("");

  // on component mount if there is no state is hits the endpoint and gets the post data
  useEffect(() => {
    const getData = async () => {
      const data = await axios.post(
        "http://localhost:4000/home",
        {},
      );
      setState(data);
    };

    if (!state) {
      getData();
    }
  }, []);

  // if the state has been updated by getData then we map down each post into its own thought component
  if (state) {
    return (
      <>
        {state["data"].map((post) => (
          <Thought
            key={post["_id"]}
            _id={post["_id"]}
            user={post["user"]}
            text={post["text"]}
            likes={post["likes"]}
            reposts={post["reposts"]}
          ></Thought>
        ))}
      </>
    );
  }
};
