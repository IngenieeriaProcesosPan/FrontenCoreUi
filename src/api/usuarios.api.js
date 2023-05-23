import api from "./api";

export const agregarUsuario = async (usuario) => {
  try {
    const response = await api.post("/usuarios/agregarUsuario", usuario);
    return response.data;

  } catch (error) {
    console.error(error);
  }
}

export const obtenerUsuarios = async () => {
  try {
    const response = await api.get("/usuarios/");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const modificarUsuario = async (usuario) => {
  try {
    const {idusuario} = usuario;
    const response = await api.put(`/usuarios/modificarUsuario/${idusuario}`, usuario);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const eliminarUsuario = async (idusuario) => {
  try {
    console.log(`/usuarios/eliminarUsuario/${idusuario}`);
    const response = await api.delete(`/usuarios/eliminarUsuario/${idusuario}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}