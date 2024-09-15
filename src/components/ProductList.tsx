import React from 'react';
import { Product } from '../types';
import ProductItem from './ProductItem';

interface Props {
  products: Product[];
  selectedProductId: number | null;
  onSelectProduct: (id: number) => void;
  onDeleteProduct: (id: number) => void;
}

const ProductList: React.FC<Props> = ({ products, onSelectProduct, onDeleteProduct, selectedProductId }) => (
  <div className='product-list'>
    {
    products.map(product => <ProductItem product={product} onSelectProduct={onSelectProduct} onDeleteProduct={onDeleteProduct} selectedProductId={selectedProductId}/>)
    }
  </div>
);

export default ProductList;
