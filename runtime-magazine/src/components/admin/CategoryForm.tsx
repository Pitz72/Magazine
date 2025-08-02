import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategoryById, createCategory, updateCategory } from '../../services/api';

const CategoryForm: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [name, setName] = useState('');

  useEffect(() => {
    if (categoryId) {
      const category = getCategoryById(parseInt(categoryId, 10));
      if (category) {
        setName(category.name);
      }
    }
  }, [categoryId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const categoryData = { name };
    if (categoryId) {
      updateCategory(parseInt(categoryId, 10), categoryData);
    } else {
      createCategory(categoryData);
    }
    navigate('/admin/categories');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold">{categoryId ? 'Modifica Categoria' : 'Crea Nuova Categoria'}</h2>
      <div>
        <label htmlFor="name" className="block mb-1">Nome</label>
        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 bg-gray-800 rounded" required />
      </div>
      <div className="flex justify-end space-x-4">
        <button type="button" onClick={() => navigate('/admin/categories')} className="bg-gray-600 text-white px-4 py-2 rounded">Annulla</button>
        <button type="submit" className="bg-accent-red text-white px-4 py-2 rounded hover:bg-red-700">{categoryId ? 'Aggiorna' : 'Crea'}</button>
      </div>
    </form>
  );
};

export default CategoryForm;
