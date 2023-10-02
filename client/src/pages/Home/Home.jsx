import "./home.css";
import { Feed } from "../../components/Feed/Feed";
import { PostModal } from "../../components/PostModal/PostModal";

import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState } from "react";

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

  return (
    <div className="home">
      <button onClick={Logout}>LOGOUT</button>
      <Feed key={openModel}
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
      <PostModal open={openModel} close={() => setOpenModel(false)}></PostModal>
    </div>
  );
};

export default Home;
