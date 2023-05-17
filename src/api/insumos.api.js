import api from "./api";

export const agregarInsumo = async (insumo) => {
  try {
    const response = await api.post("/inventario/agregarInsumo", insumo);
    return response.data;

  } catch (error) {
    console.error(error);
  }
}

export const obtenerInsumos = async () => {
  try {
    const response = await api.get("/inventario/obtenerInsumos");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const modificarInsumo = async (insumo) => {
  try {
    const {idInsumo} = insumo;
    const response = await api.put(`/inventario/modificarInsumo/${idInsumo}`, insumo);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const eliminarInsumos = async (idsInsumo) => {
  try {
    const response = await api.delete(`/inventario/eliminarInsumos/`, {data: {ids: idsInsumo}});
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const obtenerInsumosDisponiblesPorAlmacen = async (idAlmacen) => {
  try {
    const response = await api.get(`/inventario/obtenerInsumosDisponiblesPorAlmacen/${idAlmacen}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
