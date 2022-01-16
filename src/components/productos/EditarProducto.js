import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { Spinner } from '../layout/Spinner';

export const EditarProducto = () => {
  const { id } = useParams();

  const navegar = useNavigate();

  const [producto, setProducto] = useState({
    nombre: '',
    precio: ''
  });

  const [archivo, setArchivo] = useState('');

  const consultarAPI = async () => {
    const productoConsulta = await clienteAxios.get(`/productos/${id}`);

    setProducto(productoConsulta.data.producto);
  }

  useEffect(() => {
    consultarAPI();
  }, []);

  const leerInfoProducto = e => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  }

  const leerArchivo = e => {
    setArchivo(e.target.files[0]);
  }

  const editarProducto = async e => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('nombre', producto.nombre);
    formData.append('precio', producto.precio);
    formData.append('imagen', archivo);

    try {
      const res = await clienteAxios.put(`/productos/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.status === 200) {
        Swal.fire(
          'Correcto',
          res.data.mensaje,
          'success'
        );
      }

      navegar('/productos');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Hubo un error',
        text: 'Vuelva a intentarlo'
      });
    }
  }

  const { nombre, precio, imagen } = producto;

  if (!nombre) return <Spinner />;

  return (
    <>
      <h2>Editar Producto</h2>

      <form onSubmit={editarProducto}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input 
            type="text"
            placeholder="Nombre Producto"
            name="nombre"
            value={nombre}
            onChange={leerInfoProducto}
          />
        </div>

        <div className="campo">
          <label>Precio:</label>
          <input 
            type="number"
            name="precio"
            value={precio}
            min="0.00"
            step="0.01"
            placeholder="Precio"
            onChange={leerInfoProducto}
          />
        </div>

        <div className="campo">
          <label>Imagen:</label>
          { imagen && <img src={`${process.env_REACT_APP_BACKEND_URL}/${imagen}`} alt={nombre} width="300" /> }
          <input 
            type="file" 
            name="imagen"
            onChange={leerArchivo}
          />
        </div>

        <div className="enviar">
          <input 
            type="submit"
            className="btn btn-azul"
            value="Actualizar Producto"
          />
        </div>
      </form>
    </>
  )
}