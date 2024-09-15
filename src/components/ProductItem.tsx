import React from 'react';
import { Product } from '../types';

interface Props {
  product: Product;
  selectedProductId: number | null;
  onSelectProduct: (id: number) => void;
  onDeleteProduct: (id: number) => void;
}

const ProductItem: React.FC<Props> = ({ product, onSelectProduct, onDeleteProduct, selectedProductId }) => (
    <div key={product.id} className={`px-8 py-6 m-4 cursor-pointer flex justify-between items-center ${selectedProductId===product.id ? 'bg-sky-400' : 'bg-gray-200'} rounded-xl`} onClick={() => onSelectProduct(product.id)}>
    <div className='flex'>
        <img className='w-16 h-16' src={`https://picsum.photos/100/100?random=${product.id}`}/>
        <div className='flex flex-col justify-evenly ml-4'>
            <p className='text-xl'>{product.name}</p>
            <p className='text-xl'>{product.description || 'No Description'}</p>
        </div>
    </div>
    <button onClick={() => onDeleteProduct(product.id)} className='bg-red-500 text-black rounded-xl px-4 py-3'>Delete</button>
  </div>
);

export default ProductItem;



