import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById, getCategoryById, getAuthors } from '../services/api';

// Define the Article type
interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  categoryId: number;
  authorId: number;
  date: string;
}

const ArticlePage: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (articleId) {
      const articleData = getArticleById(parseInt(articleId, 10));
      if (articleData) {
        setArticle(articleData);
      }
    }
  }, [articleId]);

  if (!article) {
    return <div>Articolo non trovato</div>;
  }

  const category = getCategoryById(article.categoryId);
  const authors = getAuthors();
  const author = authors.find(a => a.id === article.authorId);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold text-white mb-4">{article.title}</h1>
      <div className="text-gray-400 mb-8">
        <span>Scritto da {author ? author.name : 'Sconosciuto'}</span>
        <span className="mx-2">|</span>
        <span>{new Date(article.date).toLocaleDateString()}</span>
        <span className="mx-2">|</span>
        <span className="text-accent-red uppercase">{category ? category.name : 'Senza categoria'}</span>
      </div>
      <div className="prose prose-invert max-w-none">
        {article.content}
      </div>
    </div>
  );
};

export default ArticlePage;
