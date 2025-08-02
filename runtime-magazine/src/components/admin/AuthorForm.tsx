import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuthorById, createAuthor, updateAuthor } from '../../services/api';

const AuthorForm: React.FC = () => {
  const { authorId } = useParams<{ authorId: string }>();
  const navigate = useNavigate();
  const [name, setName] = useState('');

  useEffect(() => {
    if (authorId) {
      const author = getAuthorById(parseInt(authorId, 10));
      if (author) {
        setName(author.name);
      }
    }
  }, [authorId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const authorData = { name };
    if (authorId) {
      updateAuthor(parseInt(authorId, 10), authorData);
    } else {
      createAuthor(authorData);
    }
    navigate('/admin/authors');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold">{authorId ? 'Modifica Autore' : 'Crea Nuovo Autore'}</h2>
      <div>
        <label htmlFor="name" className="block mb-1">Nome</label>
        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 bg-gray-800 rounded" required />
      </div>
      <div className="flex justify-end space-x-4">
        <button type="button" onClick={() => navigate('/admin/authors')} className="bg-gray-600 text-white px-4 py-2 rounded">Annulla</button>
        <button type="submit" className="bg-accent-red text-white px-4 py-2 rounded hover:bg-red-700">{authorId ? 'Aggiorna' : 'Crea'}</button>
      </div>
    </form>
  );
};

export default AuthorForm;
