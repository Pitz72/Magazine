import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getArticleById, getCategories, getAuthors, createArticle, updateArticle } from '../../services/api';

const ArticleForm: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [authors, setAuthors] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    setCategories(getCategories());
    setAuthors(getAuthors());
    if (articleId) {
      const article = getArticleById(parseInt(articleId, 10));
      if (article) {
        setTitle(article.title);
        setContent(article.content);
        setCategoryId(article.categoryId.toString());
        setAuthorId(article.authorId.toString());
        // In a real app, you'd have an imageUrl field in your db.json
        // setImageUrl(article.imageUrl);
      }
    }
  }, [articleId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const articleData = {
      title,
      content,
      excerpt: content.substring(0, 100) + '...', // Simple excerpt generation
      categoryId: parseInt(categoryId, 10),
      authorId: parseInt(authorId, 10),
      // imageUrl, // Add this when you have imageUrl in your data model
    };

    if (articleId) {
      updateArticle(parseInt(articleId, 10), articleData);
    } else {
      createArticle(articleData);
    }
    navigate('/admin/articles');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold">{articleId ? 'Modifica Articolo' : 'Crea Nuovo Articolo'}</h2>
      <div>
        <label htmlFor="title" className="block mb-1">Titolo</label>
        <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 bg-gray-800 rounded" required />
      </div>
      <div>
        <label htmlFor="content" className="block mb-1">Contenuto</label>
        <textarea id="content" value={content} onChange={e => setContent(e.target.value)} className="w-full p-2 bg-gray-800 rounded" rows={10} required></textarea>
      </div>
      <div>
        <label htmlFor="category" className="block mb-1">Categoria</label>
        <select id="category" value={categoryId} onChange={e => setCategoryId(e.target.value)} className="w-full p-2 bg-gray-800 rounded" required>
          <option value="">Seleziona una categoria</option>
          {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="author" className="block mb-1">Autore</label>
        <select id="author" value={authorId} onChange={e => setAuthorId(e.target.value)} className="w-full p-2 bg-gray-800 rounded" required>
          <option value="">Seleziona un autore</option>
          {authors.map(auth => <option key={auth.id} value={auth.id}>{auth.name}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="imageUrl" className="block mb-1">URL Immagine</label>
        <input type="text" id="imageUrl" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full p-2 bg-gray-800 rounded" />
      </div>
      <div className="flex justify-end space-x-4">
        <button type="button" onClick={() => navigate('/admin/articles')} className="bg-gray-600 text-white px-4 py-2 rounded">Annulla</button>
        <button type="submit" className="bg-accent-red text-white px-4 py-2 rounded hover:bg-red-700">{articleId ? 'Aggiorna' : 'Crea'}</button>
      </div>
    </form>
  );
};

export default ArticleForm;
