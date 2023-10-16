import { Feed, Navbar } from "../../components/componentindex";
import "./profile.css";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const params = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // on component mount hook
  useEffect(() => {
    if (!data) getData();
  });

  // fetched the post data to pass down to feed component as props
  const getData = async () => {
    if (!data) setLoading(true);

    const posts = await axios
      .post(
        "http://localhost:4000/profileposts",
        { username: params.handle, numposts: 10 },
        { withCredentials: true }
      )
      .catch((error) => {
        if (!data) {
          setError(error);
          setLoading(false);
        }
        return <div className="home"></div>;
      });
    if (!data) setLoading(false);

    setData(posts);
  };

  return (
    <div className="profile-wrap">
      <Navbar></Navbar>
      <div className="profile-content">
        <div className="holder-left"></div>
        <Feed
          dataState={data}
          changeData={setData}
          loadingState={loading}
          changeLoading={setLoading}
          errorState={error}
          changeError={setError}
        ></Feed>
        <div className="holder-right"></div>
      </div>
    </div>
  );
};

export default Profile;
