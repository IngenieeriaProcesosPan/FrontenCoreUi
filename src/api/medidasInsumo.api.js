import api from "./api";

export const createMedidaInsumo = async (medidaInsumo) => {
  try {
    const response = await api.post("/inventario/agregarMedidasInsumos", medidaInsumo);
    return response.data;

  } catch (error) {
    console.error(error);
  }
}

export const getMedidasInsumo = async () => {
  try {
    const response = await api.get("/inventario/obtenerMedidasInsumos");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getMedidaInsumo = async (id) => {
  try {
    const response = await api.get(`/medidasInsumo/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const updateMedidaInsumo = async (medidaInsumo) => {
  try {
    const { idmedida } = medidaInsumo;
    const response = await api.put(`/inventario/modificarMedidasInsumos/${idmedida}`, medidaInsumo);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const deleteMedidaInsumo = async (id) => {
  try {
    const response = await api.delete(`/inventario/eliminarmedidaInsumo/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const deleteMedidasInsumo = async (ids) => {
  try {
    const response = await api.delete(`/inventario/eliminarMedidasInsumos/`, {data: {ids: ids}});
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

