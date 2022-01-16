import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

import { CRMContext } from '../../context/CRMContext';

export const NuevoCliente = () => {
  const navegar = useNavigate();

  const [auth, setAuth] = useContext(CRMContext);

  const [cliente, setCliente] = useState({
    nombre: '',
    apellido: '',
    empresa: '',
    email: '',
    telefono: ''
  });

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

  const agregarCliente = e => {
    e.preventDefault();

    clienteAxios.post('/clientes', cliente)
      .then(res => {
        if (res.data.code === 11000) {
          Swal.fire({
            title: 'Error',
            text: 'El cliente ya existe',
            icon: 'error'
          });

        } else {
          Swal.fire({
            title: 'Cliente Creado',
            text: res.data.mensaje,
            icon: 'success'
          });

          navegar('/');
        }
      });
  }

  if (!auth.auth && (localStorage.getItem('token') === auth.token)) {
    navegar('/iniciar-sesion');
  }

  return (
    <>
      <h2>Nuevo Cliente</h2>

      <form onSubmit={agregarCliente}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input 
            type="text"
            placeholder="Nombre Cliente"
            name="nombre"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input 
            type="text" 
            placeholder="Apellido Cliente"
            name="apellido" 
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Empresa:</label>
          <input 
            type="text" 
            placeholder="Empresa Cliente"
            name="empresa"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input 
            type="email" 
            placeholder="Email Cliente"
            name="email"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input 
            type="tel" 
            placeholder="Teléfono Cliente"
            name="telefono"
            onChange={actualizarState}
          />
        </div>

        <div className="enviar">
          <input 
            type="submit"
            className="btn btn-azul" 
            value="Agregar Cliente"
            disabled={validarCliente()}
          />
        </div>
      </form>
    </>
  )
}
