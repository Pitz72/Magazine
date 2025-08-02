import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-bg py-4 mt-8 border-t-2 border-gray-800">
      <div className="container mx-auto text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Runtime Magazine. All rights reserved.</p>
        <p className="text-sm">Un progetto di Runtime Radio.</p>
      </div>
    </footer>
  );
};

export default Footer;
