import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import API from "../api";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [locations, setLocations] = useState([]);
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch unique farmhouse locations from DB
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const { data } = await API.get("/farmhouses");
        const uniqueLocations = [...new Set(data.map((f) => f.location))];
        setLocations(uniqueLocations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocations();
  }, []);

  // ✅ Handle search submit
  const handleSearch = async (e) => {
  e.preventDefault();
  if (!destination.trim()) return;

  try {
    const { data } = await API.get("/farmhouses");
    const filtered = data.filter(
      (f) => f.location.toLowerCase() === destination.toLowerCase()
    );

    navigate("/farmhouses", {
      state: { results: filtered, searched: true },
    });
  } catch (err) {
    console.error("Search error:", err);
  }
};


  return (
    <div className='flex flex-col justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url("./src/assets/heroImage2.jpg")] bg-no-repeat bg-cover bg-center h-screen'>
      <p className="w-fit bg-[#49B9FF]/50 px-3.5 py-1 rounded-full mt-20">
        The Ultimate Picnic Experience
      </p>
      <h1 className='font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-bold max-w-xl mt-4'>
        Discover Your Perfect Gateway Destination
      </h1>
      <p className='max-w-130 mt-2 text-sm md:text-base'>
        Unparalleled luxury and comfort await at Karachi's most exclusive Farmhouses.
        Book today for a memorable day with your friends and family.
      </p>

      {/* ✅ Only destination search */}
      <form
        onSubmit={handleSearch}
        className='w-fit bg-white text-gray-500 rounded-lg px-6 py-4 mt-8 flex gap-4 max-md:mx-auto'
      >
        <div>
          <div className='flex items-center gap-2'>
            <img src={assets.calenderIcon} alt="" className='h-4' />
            <label htmlFor="destinationInput">Destination</label>
          </div>
          <input
            list="destinations"
            id="destinationInput"
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            placeholder="Type here"
            required
          />
          <datalist id="destinations">
            {locations.map((loc, index) => (
              <option value={loc} key={index} />
            ))}
          </datalist>
        </div>

        <button
          type="submit"
          className='flex items-center justify-center gap-1 rounded-md bg-black py-2 px-4 text-white my-auto cursor-pointer'
        >
          <img src={assets.searchIcon} alt="searchIcon" className='h-5' />
          <span>Search</span>
        </button>
      </form>
    </div>
  );
};

export default Hero;
