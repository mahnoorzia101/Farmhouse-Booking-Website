import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 md:px-16 lg:px-24 xl:px-32 py-12">
      <div className="grid gap-8 md:grid-cols-3">
        {/* Logo & About */}
        <div>
          <img src={assets.logo} alt="logo" className="h-18 mb-6" />
          <p className="text-sm leading-6">
            Book luxury farmhouses in Karachi with ease. Enjoy family gatherings,
            parties, and peaceful weekends in our carefully selected farmhouses.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/farmhouses" className="hover:text-white">FarmHouses</a></li>
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <p className="text-sm">📍 Karachi, Pakistan</p>
          <p className="text-sm">📞 +92 300 1234567</p>
          <p className="text-sm">✉️ info@farmhousebooking.com</p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
        © {new Date().getFullYear()} Farmhouse Booking. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
