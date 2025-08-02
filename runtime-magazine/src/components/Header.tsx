import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

interface Category {
  id: number;
  name: string;
}

const Header: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const categoriesData = getCategories();
    setCategories(categoriesData);
  }, []);

  return (
    <header className="bg-dark-bg py-6 border-b-4 border-accent-red shadow-lg shadow-accent-red/20">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="text-5xl font-bold text-white" style={{ textShadow: '0 0 5px #dc2626' }}>Runtime Magazine</Link>
          <p className="text-lg text-gray-400 mt-1">Il magazine di Runtime Radio - web radio pirata senza padroni</p>
        </div>
        <nav className="space-x-6 text-lg">
          <Link to="/" className="text-white hover:text-accent-red transition-colors">Home</Link>
          {categories.map(category => (
            <Link
              key={category.id}
              to={`/category/${category.name.toLowerCase()}`}
              className="text-white hover:text-accent-red transition-colors"
            >
              {category.name}
            </Link>
          ))}
          <Link to="/chi-siamo" className="text-white hover:text-accent-red transition-colors">Chi Siamo</Link>
          <Link to="/collabora" className="text-white hover:text-accent-red transition-colors">Collabora</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
