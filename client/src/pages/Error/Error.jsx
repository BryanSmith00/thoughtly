import "./error.css";

import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="error-wrap">
      <h1 className="error-header">404: Page not found</h1>
      <Link className="go-home-btn" to={"/"}>Go home</Link>
    </div>
  );
};

export default Error;
