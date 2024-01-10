import {
  Feed,
  Navbar,
  PostModal,
  Footer,
} from "../../components/componentindex";
import "./home.css";

import Landing from "../Landing/Landing.jsx"

import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies([]);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [openModal, setOpenModal] = useState(false);

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
        if (!data) {
          setError(error);
          setLoading(false);
        }
        return <div className="home"></div>;
      });
    if (!data) setLoading(false);

    setData(posts);
  };

  // if there is no cookie return <Landing />
  return (
    <div className="home">
      <div className="header">
        <Navbar></Navbar>
      </div>

      <div className="home-cont-wrap">
        <div className="holder-left"></div>

        <div className="feed-wrap">
          <Feed
            dataState={data}
            changeData={setData}
            loadingState={loading}
            changeLoading={setLoading}
            errorState={error}
            changeError={setError}
          ></Feed>
        </div>

        <div className="holder-right"></div>
      </div>

      <button
        className="add-modal"
        onClick={() => {
          if (cookies.token === "undefined" || !cookies.token)
            navigate("/login");
          else setOpenModal(!openModal);
        }}
      >
        +
      </button>

      <PostModal
        open={openModal}
        close={() => {
          setOpenModal(false);
          getData();
        }}
      ></PostModal>

      <Footer></Footer>
    </div>
  );
};

export default Home;
