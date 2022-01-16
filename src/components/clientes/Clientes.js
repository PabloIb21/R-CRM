import { useContext, useEffect, useState } from 'react';
import clienteAxios from '../../config/axios';
import { Cliente } from './Cliente';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from '../layout/Spinner';

import { CRMContext } from '../../context/CRMContext';

export const Clientes = () => {
  const navegar = useNavigate();

  const [clientes, setClientes] = useState([]);

  const [auth, setAuth] = useContext(CRMContext);

  const consultarAPI = async () => {
    if (auth.token !== '') {
      try {
        const clientesConsulta = await clienteAxios.get('/clientes', {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          }
        });

        setClientes(clientesConsulta.data);
      } catch (error) {
        if (error.response.status === 500) {
          navegar('/iniciar-sesion');
        }
      }
    } else {
      navegar('/iniciar-sesion');
    }
  }

  useEffect(() => {
    consultarAPI();
  }, [clientes]);

  if (!auth.auth) {
    navegar('/iniciar-sesion');
  }

  if (!clientes.length) return <Spinner />;

  return (
    <>
      <h2>Clientes</h2>

      <Link 
        to="/clientes/nuevo"
        className="btn btn-verde nvo-cliente"
      >
        <i className="fas fa-plus-circle"></i>
        Nuevo Cliente
      </Link>

      <ul className='listado-clientes'>
        { clientes.map(cliente => (
          <Cliente 
            key={cliente._id}
            cliente={cliente}
          />
        ))}
      </ul>
    </>
  )
}
