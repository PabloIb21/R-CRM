import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

export const EditarCliente = () => {

  const { id } = useParams();

  const navegar = useNavigate();

  const [cliente, setCliente] = useState({
    nombre: '',
    apellido: '',
    empresa: '',
    email: '',
    telefono: ''
  });

  const consultarAPI = async () => {
    const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);

    setCliente(clienteConsulta.data);
  }

  useEffect(() => {
    consultarAPI();
  }, []);

  const actualizarState = e => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value
    })
  }

  const validarCliente = () => {
    const { nombre, apellido, empresa, email, telefono } = cliente;

    // Validar que los campos esten llenos
    if(nombre.trim() === '' || apellido.trim() === '' || empresa.trim() === '' || email.trim() === '' || telefono.trim() === '') {
      return true;
    }

    return false;
  }

  const actualizarCliente = e => {
    e.preventDefault();

    clienteAxios.put(`/clientes/${cliente._id}`, cliente)
      .then(res => {
        if (res.data.code === 11000) {
          Swal.fire({
            title: 'Error',
            text: 'El cliente ya existe',
            icon: 'error'
          });

        } else {
          Swal.fire({
            title: 'Cliente Actualizado',
            text: res.data.mensaje,
            icon: 'success'
          });

          navegar('/');
        }

      });
  }

  return (
    <>
      <h2>Editar Cliente</h2>

      <form onSubmit={actualizarCliente}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input 
            type="text"
            placeholder="Nombre Cliente"
            name="nombre"
            value={cliente.nombre}
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input 
            type="text" 
            placeholder="Apellido Cliente"
            name="apellido" 
            value={cliente.apellido}
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Empresa:</label>
          <input 
            type="text" 
            placeholder="Empresa Cliente"
            name="empresa"
            value={cliente.empresa}
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input 
            type="email" 
            placeholder="Email Cliente"
            name="email"
            value={cliente.email}
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input 
            type="tel" 
            placeholder="Teléfono Cliente"
            name="telefono"
            value={cliente.telefono}
            onChange={actualizarState}
          />
        </div>

        <div className="enviar">
          <input 
            type="submit"
            className="btn btn-azul" 
            value="Actualizar Cliente"
            disabled={validarCliente()}
          />
        </div>
      </form>
    </>
  )
}
