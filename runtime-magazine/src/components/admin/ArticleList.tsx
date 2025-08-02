import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getArticles, deleteArticle } from '../../services/api';

interface Article {
  id: number;
  title: string;
  date: string;
}

const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    setArticles(getArticles());
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm('Sei sicuro di voler eliminare questo articolo?')) {
      deleteArticle(id);
      setArticles(getArticles()); // Re-fetch articles to update the list
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Gestione Articoli</h2>
        <Link to="/admin/articles/new" className="bg-accent-red text-white px-4 py-2 rounded hover:bg-red-700">
          Crea Nuovo Articolo
        </Link>
      </div>
      <table className="min-w-full bg-gray-800 text-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-700">Titolo</th>
            <th className="py-2 px-4 border-b border-gray-700">Data</th>
            <th className="py-2 px-4 border-b border-gray-700">Azioni</th>
          </tr>
        </thead>
        <tbody>
          {articles.map(article => (
            <tr key={article.id}>
              <td className="py-2 px-4 border-b border-gray-700">{article.title}</td>
              <td className="py-2 px-4 border-b border-gray-700">{new Date(article.date).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b border-gray-700">
                <Link to={`/admin/articles/edit/${article.id}`} className="text-blue-400 hover:underline mr-4">Modifica</Link>
                <button onClick={() => handleDelete(article.id)} className="text-red-400 hover:underline">Elimina</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArticleList;
