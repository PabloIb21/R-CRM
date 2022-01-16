import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";

export const NuevoProducto = () => {
  const navegar = useNavigate();

  const [producto, setProducto] = useState({
    nombre: '',
    precio: '',
  });

  const [archivo, setArchivo] = useState('');

  const leerInfoProducto = e => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  }

  const leerArchivo = e => {
    setArchivo(e.target.files[0]);
  }

  const agregarProducto = async e => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('nombre', producto.nombre);
    formData.append('precio', producto.precio);
    formData.append('imagen', archivo);

    try {
      const res = await clienteAxios.post('/productos', formData, {
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

  return (
    <>
      <h2>Nuevo Producto</h2>

      <form onSubmit={agregarProducto}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input 
            type="text"
            placeholder="Nombre Producto"
            name="nombre"
            onChange={leerInfoProducto}
          />
        </div>

        <div className="campo">
          <label>Precio:</label>
          <input 
            type="number"
            name="precio"
            min="0.00"
            step="0.01"
            placeholder="Precio"
            onChange={leerInfoProducto}
          />
        </div>

        <div className="campo">
          <label>Imagen:</label>
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
            value="Agregar Producto"
          />
        </div>
      </form>
    </>
  )
}