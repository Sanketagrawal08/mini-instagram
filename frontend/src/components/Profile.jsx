import { useOutletContext } from "react-router-dom";
import UserPosts from "./UserPosts";
import api from "../api";
import { useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore";

const Profile = () => {
 const [followers,setFollowers] = useState(null);
const { user } = useOutletContext();
  const {getFollowers} = useAuthStore();

  useEffect(() => {
    if (user?._id) {
      getFollowers(user._id)
        .then((data) => setFollowers(data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  return (
    <div className="flex">
      
      <UserPosts />
    </div>
  );
};

export default Profile;
