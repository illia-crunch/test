import { Provider } from 'react-redux';
import { store } from './redux/productsStore.ts';
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <Router>
    <App />
  </Router>
</Provider>,
)
