// Pages/About.jsx
import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const About = () => {
  return (
    <section className="px-6 md:px-16 lg:px-24 xl:px-32 pt-32 pb-20 bg-green-50">
      {/* Heading */}
      <h2 className="text-4xl font-extrabold mb-10 text-center text-gray-800">
        About Us
      </h2>

      {/* Legacy Section */}
      <p className="text-lg text-gray-700 mb-16 max-w-4xl mx-auto text-center leading-relaxed">
        With over a decade of excellence, our company has been at the forefront of
        providing premium farmhouse rentals. We believe in connecting people with
        nature while ensuring comfort, luxury, and unforgettable memories. Our
        legacy is built on trust, quality service, and creating joyful
        experiences for families and friends.
      </p>

      {/* Contact Details + Social Media */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Contact Info */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">Contact Us</h3>
          <div className="space-y-4 text-gray-600">
            <p className="flex items-center gap-3">
              <FaPhoneAlt className="text-green-600" /> +92 300 1234567
            </p>
            <p className="flex items-center gap-3">
              <FaEnvelope className="text-green-600" /> info@farmhouserentals.com
            </p>
            <p className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-green-600" /> Karachi, Pakistan
            </p>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">Follow Us</h3>
          <div className="flex gap-6 text-2xl text-green-600">
            <a href="#" className="hover:text-green-800"><FaFacebook /></a>
            <a href="#" className="hover:text-green-800"><FaTwitter /></a>
            <a href="#" className="hover:text-green-800"><FaInstagram /></a>
            <a href="#" className="hover:text-green-800"><FaLinkedin /></a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
