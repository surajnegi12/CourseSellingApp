import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white text-center py-4 border-t border-white/20 mt-auto">
      <p className="text-sm text-gray-300">
        &copy; {new Date().getFullYear()} Course Platform. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
