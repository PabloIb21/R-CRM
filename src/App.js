import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Header } from "./components/layout/Header";
import { Nav } from "./components/layout/Nav";

import { Clientes } from './components/clientes/Clientes';
import { NuevoCliente } from './components/clientes/NuevoCliente';
import { EditarCliente } from './components/clientes/EditarCliente';

import { Productos } from './components/productos/Productos';
import { NuevoProducto } from './components/productos/NuevoProducto';
import { EditarProducto } from './components/productos/EditarProducto';

import { Pedidos } from './components/pedidos/Pedidos';
import { NuevoPedido } from './components/pedidos/NuevoPedido';

import { Login } from './components/auth/Login';

import { CRMContext, CRMProvider } from './context/CRMContext';

function App() {
  const [auth, setAuth] = useContext(CRMContext);

  return (
    <Router>
      <>
        <CRMProvider value={[auth, setAuth]}>
          <Header />

          <div className="grid contenedor contenido-principal">
            <Nav />

            <main className="caja-contenido col-9">
              <Routes>
                <Route path="/" element={ <Clientes /> } />
                <Route path="/clientes/nuevo" element={ <NuevoCliente /> } />
                <Route path="/clientes/editar/:id" element={ <EditarCliente /> } />

                <Route path="/productos" element={ <Productos /> } />
                <Route path="/productos/nuevo" element={ <NuevoProducto /> } />
                <Route path="/productos/editar/:id" element={ <EditarProducto /> } />

                <Route path="/pedidos" element={ <Pedidos /> } />
                <Route path="/pedidos/nuevo/:id" element={ <NuevoPedido /> } />

                <Route path="/iniciar-sesion" element={ <Login /> } />
              </Routes>
            </main>
          </div>
        </CRMProvider>
      </>
    </Router>
  );
}

export default App;
