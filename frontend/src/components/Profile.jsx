import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser ] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    axios
    .get("http://localhost:3000/users/userProfile", { withCredentials: true })
    .then((res) => setUser (res.data))
    .catch((err) => console.log(err));
  }, []);
  
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/users/logout", {}, { withCredentials: true });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  
  if (!user) return <h2>Loading...</h2>;
  
  const firstLetter = user.username.slice(0,1) || " "
  return (
    <div>
      <nav className="w-full h-[8vh] bg-gray-800 flex justify-between items-center px-4">
        <div className="text-white text-lg font-bold">
          <h2>Instagram</h2>
        </div>
          <h2 className="text-white">Welcome, {user.username}</h2>
        <div className="flex items-center space-x-4">
        <i className="text-white text-2xl ri-add-circle-line"></i>
        <div className="flex justify-center items-center bg-gray-100 rounded-full w-7 h-7"><h3> {firstLetter} </h3></div>
        </div>
      </nav>
    </div>
  );
};

export default Profile;