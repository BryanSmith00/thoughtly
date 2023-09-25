import "./home.css";

import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);

  const Logout = () => {
    removeCookie("token");
    navigate("/login");
  };
  const getData = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/home",
        {},
        { withCredentials: true }
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  getData();

  return (
    <>
      <div className="home_page">
        <h4> Welcome</h4>
      </div>
      <button onClick={Logout}>LOGOUT</button>
    </>
  );
};

export default Home;
