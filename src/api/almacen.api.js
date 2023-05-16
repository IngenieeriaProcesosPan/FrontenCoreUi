import api from "./api";

export const agregarAlmacen = async (almacen) => {
  try {
    const response = await api.post("/inventario/agregarAlmacen", almacen);
    return response.data;

  } catch (error) {
    console.error(error);
  }
}

export const obtenerAlmacenes = async () => {
  try {
    const response = await api.get("/inventario/obtenerAlmacenes");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const modificarAlmacen = async (almacen) => {
  try {
    const {idalmacen} = almacen;
    const response = await api.put(`/inventario/modificarAlmacen/${idalmacen}`, almacen);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const eliminarAlmacenes = async (idsAlmacen) => {
  try {
    const response = await api.delete(`/inventario/eliminarAlmacenes/`, {data: {ids: idsAlmacen}});
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
