import "./profile.css";

import { useParams } from "react-router-dom";

const Profile = () => {
  const params = useParams();

  return (
    <div className="profile-wrap">
      <h1>This is where the profile for @{params.handle} will be</h1>
    </div>
  );
};

export default Profile;
