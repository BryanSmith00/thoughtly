import "./home.css";
import { Feed } from "../../components/Feed/Feed";
import { PostModal } from "../../components/PostModal/PostModal";

import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [openModel, setOpenModel] = useState(false);

  const Logout = () => {
    if (cookies) {
      removeCookie("token");
      navigate("/login");
    }
  };

  // on component mount hook
  useEffect(() => {
    if (!data) getData();
  });

  // fetched the post data to pass down to feed component as props
  const getData = async () => {
    if (!data) setLoading(true);

    const posts = await axios
      .post("http://localhost:4000/home", {})
      .catch((error) => {
        console.error("error: ", error);

        if (!data) {
          setError(error);
          setLoading(false);
        }
      });
    if (!data) setLoading(false);

    setData(posts);
  };

  return (
    <div className="home">
      <button onClick={Logout}>LOGOUT</button>
      <Feed
        dataState={data}
        changeData={setData}
        loadingState={loading}
        changeLoading={setLoading}
        errorState={error}
        changeError={setError}
      ></Feed>

      <button className="add-modal" onClick={() => setOpenModel(true)}>
        +
      </button>
      <PostModal
        open={openModel}
        close={() => {
          setOpenModel(false);
          getData();
        }}
      ></PostModal>
    </div>
  );
};

export default Home;
