import db from '../data/db.json';

export const getArticles = () => {
  return db.articles;
};

export const getCategories = () => {
  return db.categories;
};

export const getCategoryById = (id: number) => {
  return db.categories.find(category => category.id === id);
}

export const getArticleById = (id: number) => {
  return db.articles.find(article => article.id === id);
}

export const getArticlesByCategoryName = (categoryName: string) => {
  const category = db.categories.find(c => c.name.toLowerCase() === categoryName.toLowerCase());
  if (!category) {
    return [];
  }
  return db.articles.filter(article => article.categoryId === category.id);
}

export const getAuthors = () => {
  return db.authors;
};

// NOTE: These functions simulate a backend API.
// In a real application, these would be HTTP requests to a server.
// The data is not persisted, it's only modified in memory.

export const createArticle = (article: Omit<typeof db.articles[0], 'id' | 'date'>) => {
  const newArticle = {
    ...article,
    id: Math.max(...db.articles.map(a => a.id)) + 1,
    date: new Date().toISOString(),
  };
  db.articles.push(newArticle);
  return newArticle;
};

export const updateArticle = (id: number, article: Partial<typeof db.articles[0]>) => {
  const index = db.articles.findIndex(a => a.id === id);
  if (index !== -1) {
    db.articles[index] = { ...db.articles[index], ...article };
    return db.articles[index];
  }
  return null;
};

export const deleteArticle = (id: number) => {
  const index = db.articles.findIndex(a => a.id === id);
  if (index !== -1) {
    db.articles.splice(index, 1);
    return true;
  }
  return false;
};

export const getAuthorById = (id: number) => {
  return db.authors.find(author => author.id === id);
}

export const createAuthor = (author: Omit<typeof db.authors[0], 'id'>) => {
  const newAuthor = {
    ...author,
    id: Math.max(...db.authors.map(a => a.id)) + 1,
  };
  db.authors.push(newAuthor);
  return newAuthor;
};

export const updateAuthor = (id: number, author: Partial<typeof db.authors[0]>) => {
  const index = db.authors.findIndex(a => a.id === id);
  if (index !== -1) {
    db.authors[index] = { ...db.authors[index], ...author };
    return db.authors[index];
  }
  return null;
};

export const deleteAuthor = (id: number) => {
  const index = db.authors.findIndex(a => a.id === id);
  if (index !== -1) {
    db.authors.splice(index, 1);
    return true;
  }
  return false;
};

export const createCategory = (category: Omit<typeof db.categories[0], 'id'>) => {
  const newCategory = {
    ...category,
    id: Math.max(...db.categories.map(c => c.id)) + 1,
  };
  db.categories.push(newCategory);
  return newCategory;
};

export const updateCategory = (id: number, category: Partial<typeof db.categories[0]>) => {
  const index = db.categories.findIndex(c => c.id === id);
  if (index !== -1) {
    db.categories[index] = { ...db.categories[index], ...category };
    return db.categories[index];
  }
  return null;
};

export const deleteCategory = (id: number) => {
  const index = db.categories.findIndex(c => c.id === id);
  if (index !== -1) {
    db.categories.splice(index, 1);
    return true;
  }
  return false;
};
