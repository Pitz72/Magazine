import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticlesByCategoryName, getCategoryById } from '../services/api';
import NewsCard from '../components/NewsCard';

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

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (categoryName) {
      const articlesData = getArticlesByCategoryName(categoryName);
      setArticles(articlesData);
    }
  }, [categoryName]);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Categoria: {categoryName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => {
          const category = getCategoryById(article.categoryId);
          return (
            <Link to={`/article/${article.id}`} key={article.id}>
              <NewsCard
                id={article.id}
                title={article.title}
                excerpt={article.excerpt}
                category={category ? category.name : 'Senza categoria'}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryPage;
