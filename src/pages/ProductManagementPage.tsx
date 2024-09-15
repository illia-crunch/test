// src/App.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/productsStore';
import {
  addProduct,
  updateProduct,
  deleteProduct,
  setSearchText,
  setSortBy,
  setCurrentPage,
} from '../redux/productsSlice';
import ProductList from '../components/ProductList';
import ProductDetails from '../components/ProductDetails';
import ProductFilters from '../components/ProductFilters';
import { Product } from '../types';
import ProductsPagination from '../components/ProductsPagination';
import { useParams, useNavigate } from 'react-router-dom';

const ProductManagementPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>();
  const { products, searchText, sortBy, currentPage, itemsPerPage } = useSelector(
    (state: RootState) => state.products
  );
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    Number(id)
  );

  const filteredProducts = products
    .filter(
      (p) => p.name.includes(searchText) || p.description?.includes(searchText)
    )
    .sort((a, b) =>
      sortBy === 'name'
        ? a.name.localeCompare(b.name)
        : Number(b.creationDate) - Number(a.creationDate)
    ).slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage);


  const selectedProduct = filteredProducts.find(
    (p) => p.id === selectedProductId
  ) || {
    name: '',
    price: 0,
    description: '',
    creationDate: new Date().valueOf(),
    id: Number(selectedProductId),
  };

  const handleSelectProduct = (productId: number) => {
    navigate(`/products/${productId}`);
    setSelectedProductId(productId);
  }

  const handleSaveProduct = (product: Product) => {
    const ids = products.map((e) => e.id);
    if (ids.findIndex((p) => p === product.id) == -1) {
      const newProduct = {
        ...product,
        creationDate: new Date().valueOf(),
      };
      dispatch(addProduct(newProduct));
    } else {
      dispatch(updateProduct(product));
    }
    setSelectedProductId(null); // Clear selection after save
  };

  const handleDeleteProduct = (id: number) => {
    dispatch(deleteProduct(id));
    setSelectedProductId(null);
  };

  const handleNewProduct = () => {
    const ids = products.map((e) => e.id);
    const maxId = Math.max(...ids);
    navigate('/products')
    setSelectedProductId(maxId+1);
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  }

  return (
    <div className='p-4 m-14 border border-black'>
      <h1 className='bg-sky-600 p-4 text-white'>Products App</h1>
      <ProductFilters
        searchText={searchText}
        sortBy={sortBy}
        onNewProduct={handleNewProduct}
        onSearchTextChange={(text) => dispatch(setSearchText(text))}
        onSortByChange={(sortBy) =>
          dispatch(setSortBy(sortBy as 'name' | 'creationDate'))
        }
      />
      <div className='flex'>
        <div className='w-1/2'>
          <ProductList
            products={filteredProducts}
            selectedProductId={selectedProductId}
            onSelectProduct={handleSelectProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        </div>

          <div className='w-1/2'>
           {
            selectedProductId &&
            <ProductDetails
            product={selectedProduct}
            onSave={handleSaveProduct}
          />

           } 
          </div>
      </div>
      <ProductsPagination products={products} itemsPerPage={itemsPerPage} currentPage={currentPage} setCurrentPage={handlePageChange}/>
    </div>
  );
};

export default ProductManagementPage;
