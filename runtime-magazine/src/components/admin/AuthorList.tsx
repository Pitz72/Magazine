import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuthors, deleteAuthor } from '../../services/api';

interface Author {
  id: number;
  name: string;
}

const AuthorList: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    setAuthors(getAuthors());
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm('Sei sicuro di voler eliminare questo autore?')) {
      deleteAuthor(id);
      setAuthors(getAuthors()); // Re-fetch authors to update the list
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Gestione Autori</h2>
        <Link to="/admin/authors/new" className="bg-accent-red text-white px-4 py-2 rounded hover:bg-red-700">
          Crea Nuovo Autore
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
          {authors.map(author => (
            <tr key={author.id}>
              <td className="py-2 px-4 border-b border-gray-700">{author.name}</td>
              <td className="py-2 px-4 border-b border-gray-700">
                <Link to={`/admin/authors/edit/${author.id}`} className="text-blue-400 hover:underline mr-4">Modifica</Link>
                <button onClick={() => handleDelete(author.id)} className="text-red-400 hover:underline">Elimina</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuthorList;
