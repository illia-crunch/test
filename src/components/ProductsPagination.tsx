import React from 'react';
import { Product } from '../types';

interface Props {
  products: Product[];
  currentPage: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
}

const ProductsPagination: React.FC<Props> = ({ products, currentPage, itemsPerPage, setCurrentPage }) => (
  <div className='flex justify-center items-center'>
   <button disabled={currentPage <= 1} onClick={() => setCurrentPage(currentPage - 1)}>&lt; Prev page</button>
   <span className='mx-4'>
    {`${currentPage} of ${Math.ceil(products.length/itemsPerPage)}`}
   </span>
   <button disabled={currentPage >= Math.ceil(products.length/itemsPerPage)} onClick={() => setCurrentPage(currentPage + 1)}>Next page &gt;</button>
  </div>
);

export default ProductsPagination;