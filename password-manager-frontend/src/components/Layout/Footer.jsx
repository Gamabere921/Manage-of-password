import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start mt-auto">
      <div className="text-center p-3">
        &copy; {new Date().getFullYear()} Password Manager
      </div>
    </footer>
  );
};

export default Footer;
