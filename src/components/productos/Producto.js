import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";

export const Producto = ({ producto }) => {
  const { _id, nombre, precio, imagen } = producto;

  const eliminarProducto = async id => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        clienteAxios.delete(`/productos/${id}`)
          .then(res => {
            Swal.fire(
              'Eliminado!',
              res.data.mensaje,
              'success'
            )
          })
        }
    })
  }

  return (
    <li className="producto">
      <div className="info-producto">
        <p className="nombre">{nombre}</p>
        <p className="precio">$ {precio} </p>
        { imagen && <img src={`http://localhost:5000/${imagen}`} alt={nombre} /> }

      </div>
      <div className="acciones">
        <Link to={`/productos/editar/${_id}`} className="btn btn-azul">
          <i className="fas fa-pen-alt"></i>
          Editar Producto
        </Link>

        <button 
          type="button"
          onClick={ () => eliminarProducto(_id) }
          className="btn btn-rojo btn-eliminar"
        >
          <i className="fas fa-times"></i>
          Eliminar Producto
        </button>
      </div>
    </li>
  )
}