import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddBuyer from './pages/CadastrarComprador';
import Home from './pages/Home';
import GetBuyer from './pages/VerComprador';
import AddProduct from './pages/CadastrarProduto';
import GetProduct from './pages/VerProduto';
import CreateSale from './pages/CadastrarCompra';
import UploadXlsx from './pages/ImportarProduto';
import ProductList from './pages/ListaProdutos';
import BuyerList from './pages/ListaComprador';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/cadastrar-comprador' element={<AddBuyer />}/>
          <Route path='/ver-comprador/:id' element={<GetBuyer />}/>
          <Route path='/cadastrar-produto' element={<AddProduct />}/>
          <Route path='/ver-produto/:id' element={<GetProduct />}/>
          <Route path='/cadastrar-compra' element={<CreateSale />} />
          <Route path='/importar-produto' element={<UploadXlsx />}/>
          <Route path='/listar-produtos' element={<ProductList/>}/>
          <Route path='/listar-compradores' element={<BuyerList />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

