import api from "./api";

export const agregarStock = async (stock) => {
  try {
    const response = await api.post("/inventario/agregarStock", stock);
    return response.data;

  } catch (error) {
    console.error(error);
  }
}

export const obtenerStocks = async () => {
  try {
    const response = await api.get("/inventario/obtenerStocks");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const modificarStock = async (stock) => {
  try {
    const response = await api.put(`/inventario/modificarStock/`, stock);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const eliminarStocks = async (stock) => {
  try {
    const response = await api.delete(`/inventario/eliminarStock/`, {data: {idAlmacen: stock.idAlmacen, idInsumo: stock.idInsumo}});
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

