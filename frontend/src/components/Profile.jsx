import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserPosts from "./UserPosts";
import Sidebar from "./Sidebar";
const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { 
    axios
      .get("http://localhost:3000/users/userProfile", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex">
      <Sidebar user={user} />
      <UserPosts />
      
    </div>
  );
};
export default Profile;