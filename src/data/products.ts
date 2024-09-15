import { Product } from '../types';

export const initialProducts: Product[] = [
  { id: 1, name: 'Product 1', description: 'First Product', price: 100, creationDate: new Date().valueOf() },
  { id: 2, name: 'Product 2', description: 'Second Product', price: 200, creationDate: new Date().valueOf() },
];