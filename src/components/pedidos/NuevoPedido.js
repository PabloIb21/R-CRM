import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';

import clienteAxios from '../../config/axios';
import { FormBuscarProducto } from './FormBuscarProducto';
import { FormCantidadProducto } from './FormCantidadProducto';

export const NuevoPedido = () => {
  const { id } = useParams();

  const [cliente, setCliente] = useState({});
  const [busqueda, setBusqueda] = useState('');
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);

  const navegar = useNavigate();

  useEffect(() => {
    const consultarAPI = async () => {
      const resultado = await clienteAxios.get(`/clientes/${id}`);
      setCliente(resultado.data);
    }
    consultarAPI();
  }, []);

  useEffect(() => {
    actualizarTotal();
  }, [productos]);

  const buscarProducto = async e => {
    e.preventDefault();

    const res = await clienteAxios.post(`/productos/busqueda/${busqueda}`);
    
    if (res.data[0]) {
      let productoResultado = res.data[0];

      productoResultado.producto = productoResultado._id;
      productoResultado.cantidad = 0;

      setProductos([...productos, productoResultado]);
    } else {
      Swal.fire({
        title: 'Error',
        text: 'No se encontró el producto',
        icon: 'error'
      });
    }
  }

  const leerDatosBusqueda = e => {
    setBusqueda(e.target.value);
  }

  const restarProductos = i => {
    const todosProductos = [...productos];

    if (todosProductos[i].cantidad === 0) return;

    todosProductos[i].cantidad--;

    setProductos(todosProductos);
  }

  const aumentarProductos = i => {
    const todosProductos = [...productos];

    todosProductos[i].cantidad++;

    setProductos(todosProductos);
  }

  const actualizarTotal = () => {
    if (productos.length === 0) {
      setTotal(0);
      return;
    }

    let nuevoTotal = 0;

    productos.forEach(producto =>  nuevoTotal += producto.precio * producto.cantidad);

    setTotal(nuevoTotal);
  }

  const eliminarProductoPedido = id => {
    const todosProductos = productos.filter(producto => producto._id !== id);

    setProductos(todosProductos);
  }

  const realizarPedido = async e => {
    e.preventDefault();

    const pedido = {
      cliente: id,
      pedido: productos,
      total
    }

    const res = await clienteAxios.post(`/pedidos/nuevo/${id}`, pedido);

    if (res.status === 200) {
      Swal.fire({
        title: 'Correcto',
        text: 'Pedido realizado correctamente',
        icon: 'success'
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error',
        icon: 'error'
      });
    }

    navegar('/pedidos');
  }

  return (
    <div>
      <h2>Nuevo Pedido</h2>

      <div className="ficha-cliente">
        <h3>Datos de Cliente</h3>
        <p>Nombre: {cliente.nombre}</p>
        <p>Teléfono: {cliente.telefono}</p>
      </div>

      <FormBuscarProducto
        buscarProducto={buscarProducto}
        leerDatosBusqueda={leerDatosBusqueda}
      />

      <ul className="resumen">
        {productos.map((producto, index) => (
          <FormCantidadProducto 
            key={index}
            producto={producto}
            restarProductos={restarProductos}
            aumentarProductos={aumentarProductos}
            eliminarProductoPedido={eliminarProductoPedido}
            index={index}
          />
        ))}
      </ul>

      <p className="total">Total a pagar: <span>$ {total}</span></p>

      {
        total > 0 
          &&
            <form
              onSubmit={realizarPedido}
            >
              <input 
                type="submit"
                className="btn btn-verde btn-block"
                value="Realizar Pedido" />
            </form>
      }
    </div>
  )
}
