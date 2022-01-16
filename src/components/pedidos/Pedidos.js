import { useState, useEffect } from "react";

import clienteAxios from "../../config/axios";

import { DetallesPedido } from "./DetallesPedido";

export const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const consultarAPI = async () => {
      const res = await clienteAxios.get("/pedidos");
      setPedidos(res.data);
    }

    consultarAPI();
  }, []);

  return (
    <>
      <h2>Pedidos</h2>

      <ul className="listado-pedidos">
        {pedidos.map(pedido => (
          <DetallesPedido 
            key={pedido._id}
            pedido={pedido}
          />
        ))}
      </ul>
    </>
  )
}
