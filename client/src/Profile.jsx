// Pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

const Profile = () => {
  const { user } = useUser();
  const [mongoUser, setMongoUser] = useState(null);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/api/users/${user.id}`)
        .then((res) => setMongoUser(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  if (!mongoUser) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">Profile</h2>
      <p><strong>Name:</strong> {mongoUser.name}</p>
      <p><strong>Email:</strong> {mongoUser.email}</p>
      <p><strong>Phone:</strong> {mongoUser.phone || "N/A"}</p>
      <p><strong>Bookings:</strong> {mongoUser.bookings?.length || 0}</p>
    </div>
  );
};

export default Profile;
