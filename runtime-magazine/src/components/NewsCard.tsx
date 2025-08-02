import React from 'react';

type ArticlePreview = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
};

const NewsCard: React.FC<ArticlePreview> = ({ title, excerpt, category }) => {
  return (
    <div className="bg-gray-900/50 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-accent-red/40 border-2 border-transparent hover:border-accent-red/50">
      <div className="p-6">
        <span className="text-md font-bold text-accent-red uppercase tracking-wider">{category}</span>
        <h3 className="text-3xl font-bold text-white mt-2">{title}</h3>
        <p className="text-gray-300 mt-4 text-lg">{excerpt}</p>
        <div className="text-accent-red hover:text-red-700 mt-6 inline-block font-bold text-xl">Leggi di più →</div>
      </div>
    </div>
  );
};

export default NewsCard;
