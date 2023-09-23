import "./home.css";
import Feed from "../../components/Feed/Feed";

const Home = () => {
    return (
      <>
        <div className="home_page">
          <h4>
            {" "}
            Welcome
          </h4>
          <Feed></Feed>
        </div>
      </>
    );
  };
  
  export default Home;
  