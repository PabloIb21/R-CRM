import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import clienteAxios from "../../config/axios";
import { Spinner } from "../layout/Spinner";
import { Producto } from "./Producto";

import { CRMContext } from '../../context/CRMContext';

export const Productos = () => {
  const navegar = useNavigate();

  const [auth, setAuth] = useContext(CRMContext);

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    if (auth.token !== '') {
      const consultarAPI = async () => {
        try {
          const productosConsulta = await clienteAxios.get('/productos', {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            }
          });

          setProductos(productosConsulta.data.productos);
        } catch (error) {
          if (error.response.status === 500) {
            navegar('/iniciar-sesion');
          }
        }
      }

      consultarAPI();
    } else {
      navegar('/iniciar-sesion');
    }
  }, [productos]);

  if (!auth.auth) {
    navegar('/iniciar-sesion');
  }

  if (!productos.length) return <Spinner />;

  return (
    <>
      <h2>Productos</h2>

      <Link to={`/productos/nuevo`} className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i>
        Nuevo Producto
      </Link>

      <ul className="listado-productos">
        {productos.map(producto => (
          <Producto 
            key={producto._id}
            producto={producto}
          />
        ))}
      </ul>
    </>
  )
}
