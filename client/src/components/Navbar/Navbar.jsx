import "./navbar.css";

import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const [cookies, removeCookie] = useCookies([]);

  const Logout = () => {
    removeCookie("token");
  };

  if (cookies.token === "undefined" || !cookies.token) {
    return (
      <section className="navigation">
        <div className="nav-container">
          <nav>
            <ul className="nav-list">
              <li className="nav-home">
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/trending"}>Trending</Link>
              </li>

              <li></li>
              <li></li>

              <li>
                <div className="nav-name">
                  <Link to={"/"}>Thoughtly</Link>
                </div>
              </li>

              <li></li>
              <li></li>

              <li>
                <Link className="nav-signup" to={"/signup"}>
                  Sign up
                </Link>
              </li>
              <li>
                <Link className="nav-login" to={"/login"}>
                  Log in
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    );
  } else {
    return (
      <section className="navigation">
        <div className="nav-container">
          <nav>
            <ul className="nav-list">
              <li className="nav-home">
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/trending"}>Trending</Link>
              </li>

              <li></li>
              <li></li>

              <li>
                <div className="nav-name">
                  <Link to={"/"}>Thoughtly</Link>
                </div>
              </li>

              <li></li>
              <li></li>

              <li>
                <Link className="nav-settings" to={"/settings"}>
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  className="nav-logout"
                  onClick={() => {
                    Logout();
                  }}
                  to={"/login"}
                >
                  Log out
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    );
  }
};
