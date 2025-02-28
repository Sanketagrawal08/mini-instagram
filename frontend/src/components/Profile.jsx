import { useOutletContext } from "react-router-dom";
import UserPosts from "./UserPosts";

const Profile = () => {
  return (
    <div className="flex">
      <UserPosts />
    </div>
  );
};

export default Profile;
