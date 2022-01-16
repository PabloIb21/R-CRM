import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CRMContext } from "../../context/CRMContext"

export const Header = () => {
  const navegar = useNavigate();

  const [auth, setAuth] = useContext(CRMContext);

  const cerrarSesion = () => {
    setAuth({
      token: "",
      auth: false
    });

    localStorage.setItem("token", "");

    navegar("/iniciar-sesion");
  }

  return (
    <header className="barra">
      <div className="contenedor">
        <div className="contenido-barra">
          <h1>CRM - Administrador de Clientes</h1>

          { 
            auth.auth 
              &&
              <button 
                type="button"
                className="btn btn-rojo"
                onClick={cerrarSesion}
              >
                <i className="far fa-times-circle"></i>
                Cerrar Sesión
              </button>
          }
        </div>
      </div>
    </header>
  )
}
