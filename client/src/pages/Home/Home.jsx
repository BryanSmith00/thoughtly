import "./home.css";
import { Feed } from "../../components/Feed/Feed";

import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);

  const Logout = () => {
    removeCookie("token");
    navigate("/login");
  };

  return (
    <>
      <div className="home_page">
        <h4> Welcome</h4>
      </div>
      <button onClick={Logout}>LOGOUT</button>
      <Feed></Feed>
    </>
  );
};

export default Home;
