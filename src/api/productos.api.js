import api from "./api";

export const createProduct = async (producto) => {
  try {
    const response = await api.put("/productos/agregarproductos", producto);
    console.log(response.data)
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

export const updateProduct = async (id, producto) => {
  try {
    const response = await api.put(`/productos/actualizarproducto/${id}`, producto);
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
