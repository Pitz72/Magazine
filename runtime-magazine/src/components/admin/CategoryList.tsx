import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, deleteCategory } from '../../services/api';

interface Category {
  id: number;
  name: string;
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setCategories(getCategories());
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm('Sei sicuro di voler eliminare questa categoria?')) {
      deleteCategory(id);
      setCategories(getCategories()); // Re-fetch categories to update the list
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Gestione Categorie</h2>
        <Link to="/admin/categories/new" className="bg-accent-red text-white px-4 py-2 rounded hover:bg-red-700">
          Crea Nuova Categoria
        </Link>
      </div>
      <table className="min-w-full bg-gray-800 text-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-700">Nome</th>
            <th className="py-2 px-4 border-b border-gray-700">Azioni</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.id}>
              <td className="py-2 px-4 border-b border-gray-700">{category.name}</td>
              <td className="py-2 px-4 border-b border-gray-700">
                <Link to={`/admin/categories/edit/${category.id}`} className="text-blue-400 hover:underline mr-4">Modifica</Link>
                <button onClick={() => handleDelete(category.id)} className="text-red-400 hover:underline">Elimina</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
