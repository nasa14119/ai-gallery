import './index.css'
import App from './App.jsx';
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
);