import api from "./api";

export const getProducts = async () => {
  try {
    const response = await api.get("/productos");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}