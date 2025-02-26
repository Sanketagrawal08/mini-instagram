import axios from "axios";
import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users/userProfile", { withCredentials: true }) // ✅ Cookies include
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);
  
  
  if (!user) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>Welcome, {user.username}</h2>
      <p>{user.email}</p>
    </div>
  );
};

export default Profile;
