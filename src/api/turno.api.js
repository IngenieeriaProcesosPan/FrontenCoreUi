import api from "./api";

// export const agregarTurno = async (turno) => {

export const obtenerTurnoAbierto = async (idusuario) => {
  try {
    const response = await api.get(`/turnos/abiertos/${idusuario}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const abrirTurno = async (turno) => {
  try {
    const response = await api.post("/turnos/abrir", turno);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const cerrarTurno = async (turno) => {
  try {
    const response = await api.put(`/turnos/cerrar/${turno}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const actualizarEfectivo = async ({idturno, efectivo}) => {
  try {
    console.log(idturno, efectivo);
    const response = await api.put(`/turnos/actualizarEfectivo`, {idturno: idturno, efectivo: efectivo});
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
