import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-4">Admin Menu</h2>
        <nav className="flex flex-col space-y-2">
          <Link to="/admin/articles" className="hover:text-accent-red">Gestione Articoli</Link>
          <Link to="/admin/categories" className="hover:text-accent-red">Gestione Categorie</Link>
          <Link to="/admin/authors" className="hover:text-accent-red">Gestione Autori</Link>
        </nav>
      </aside>
      <main className="flex-grow p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
