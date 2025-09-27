// App.jsx
import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/home";
import Farmhouses from "./Pages/Farmhouses";
import FarmhouseDetails from "./Pages/FarmhouseDetails";
import Profile from "./Profile";
import Experience from "./Pages/Experience";
import About from "./Pages/About";

// 👇 Clerk
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");

  // Clerk user
  const { isSignedIn, user } = useUser();

  // Sync Clerk → MongoDB whenever user logs in
  useEffect(() => {
    if (isSignedIn && user) {
      axios.post("http://localhost:5000/api/users/sync", {
        clerkId: user.id,
        name: user.fullName,
        email: user.primaryEmailAddress?.emailAddress,
        phone: user.phoneNumbers?.[0]?.phoneNumber || "",
      });
    }
  }, [isSignedIn, user]);

  return (
    <div>
      {!isOwnerPath && <Navbar />}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/farmhouses" element={<Farmhouses />} />
          <Route path="/farmhouses/:id" element={<FarmhouseDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
