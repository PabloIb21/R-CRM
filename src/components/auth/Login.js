import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";

import { CRMContext } from "../../context/CRMContext";

export const Login = () => {
  const [auth, setAuth] = useContext(CRMContext);

  const navegar = useNavigate();

  const [credenciales, setCredenciales] = useState({});

  const leerDatos = e => {
    setCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value
    });
  }

  const iniciarSesion = async e => {
    e.preventDefault();

    try {
      const res = await clienteAxios.post('iniciar-sesion',  credenciales);

      const { token } = res.data;
      localStorage.setItem('token', token);

      setAuth({
        token,
        auth: true
      });

      Swal.fire(
        'Login',
        'Bienvenido',
        'success'
      );

      navegar('/');
    } catch(error) {
      if (error.response) {
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          text: error.response.data.mensaje
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          text: 'Hubo un error'
        });
      }
    }
  }

  return (
    <div className="login">
      <h2>Iniciar Sesión</h2>

      <div className="contenedor-formulario">
        <form
          onSubmit={iniciarSesion}
        >
          <div className="campo">
            <label>Email</label>
            <input 
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={leerDatos}
            />
          </div>

          <div className="campo">
            <label>Password</label>
            <input 
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={leerDatos}
            />
          </div>

          <input className="btn btn-verde btn-block" type="submit" value="Iniciar Sesión" />
        </form>
      </div>
    </div>
  )
}
