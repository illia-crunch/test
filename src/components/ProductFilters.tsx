import React from 'react';

interface Props {
  searchText: string;
  sortBy: string;
  onNewProduct: () => void;
  onSearchTextChange: (text: string) => void;
  onSortByChange: (sortBy: string) => void;
}

const ProductFilters: React.FC<Props> = ({ searchText, sortBy, onSearchTextChange, onSortByChange, onNewProduct }) => {
  return (
    <div className='flex justify-start p-4'>
    <button type='submit' className='bg-sky-500 text-black text-base rounded-lg px-3 py-2' onClick={onNewProduct}>+ Add</button>
      <input
        type='text'
        value={searchText}
        onChange={(e) => onSearchTextChange(e.target.value)}
        placeholder='Search'
        className='input mx-4'
      />
      <div className='flex items-center'>
        Sort by:
        <select value={sortBy} onChange={(e) => onSortByChange(e.target.value)} className='select ml-2'>
            <option value='name'>Name</option>
            <option value='creationDate'>Date</option>
        </select>
      </div>
    </div>
  );
};

export default ProductFilters;
