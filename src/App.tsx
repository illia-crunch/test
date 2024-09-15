import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductManagementPage from './pages/ProductManagementPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/products/:id?' element={<ProductManagementPage />} />
    </Routes>
  );
};

export default App;