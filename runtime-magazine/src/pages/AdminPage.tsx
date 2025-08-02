import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import ArticleList from '../components/admin/ArticleList';
import CategoryList from '../components/admin/CategoryList';
import AuthorList from '../components/admin/AuthorList';
import ArticleForm from '../components/admin/ArticleForm';
import ArticleForm from '../components/admin/ArticleForm';
import CategoryForm from '../components/admin/CategoryForm';
import AuthorForm from '../components/admin/AuthorForm';

const AdminPage: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Navigate to="articles" replace />} />
        <Route path="articles" element={<ArticleList />} />
        <Route path="articles/new" element={<ArticleForm />} />
        <Route path="articles/edit/:articleId" element={<ArticleForm />} />
        <Route path="categories" element={<CategoryList />} />
        <Route path="categories/new" element={<CategoryForm />} />
        <Route path="categories/edit/:categoryId" element={<CategoryForm />} />
        <Route path="authors" element={<AuthorList />} />
        <Route path="authors/new" element={<AuthorForm />} />
        <Route path="authors/edit/:authorId" element={<AuthorForm />} />
      </Route>
    </Routes>
  );
};

export default AdminPage;
