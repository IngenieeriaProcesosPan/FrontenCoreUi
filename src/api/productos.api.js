import api from "./api";

export const createProduct = async (producto) => {
  try {
    const response = await api.post("/productos/agregarproductos", producto);
    return response.data;

  } catch (error) {
    console.error(error);
  }
}

export const getProducts = async () => {
  try {
    const response = await api.get("/productos");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getProduct = async (id) => {
  try {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const updateProduct = async (producto) => {
  try {
    const { idproducto } = producto;
    const response = await api.put(`/productos/actualizarproducto/${idproducto}`, producto);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/productos/eliminarproducto/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const deleteProducts = async (ids) => {
  try {
    const response = await api.delete(`/productos/eliminarproductos/`, {data: {ids: ids}});
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
  