import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CCol,
  CFormInput,
  CCard,
} from "@coreui/react-pro";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { obtenerTurnoAbierto, cerrarTurno } from "@src/api/turno.api";
import { useEffect, useState } from "react";

export default function CerrarTurno() {
  const queryClient = useQueryClient();
  const [efectivo, setEfectivo] = useState(0);
  const [cookies] = useCookies(["userLogged"]);
  const { data, isLoading } = useQuery({
    queryKey: ["turnos"],
    queryFn: () => obtenerTurnoAbierto(cookies.userLogged.idusuario),
  });

  const onSucces = () => {
    // create toast
    window.alert(
      `El turno se cerro correctamete, efectivo ingresado: ${efectivo} Efectivo en caja: ${
        data.data[0].efectivo
      }, balance: ${efectivo - data.data[0].efectivo}`
    );
    queryClient.invalidateQueries("turnos");

    // form.reset();
    // queryClient.invalidateQueries("turnos");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTurno.mutate(data.data[0].idturno);
  };

  const addTurno = useMutation({
    mutationFn: cerrarTurno,
    onSuccess: onSucces,
  });
  if (isLoading) return "Loading...";

  if (data.data.length === 0) {
    return (
      <>
        <CCard>
          <CModalHeader>
            <CModalTitle>
              Aun no tienes un turno abierto para cerrar
            </CModalTitle>
          </CModalHeader>
        </CCard>
      </>
    );
  }

  if (data.data.length > 0) {
    return (
      <>
        <CCard>
          <CForm id="form" className="row g-3" onSubmit={handleSubmit}>
            <CModalHeader>
              <CModalTitle>Cerrar Turno</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CCol md={6}>
                <CFormInput
                  id="efectivo"
                  name="efectivo"
                  onChange={(e) => setEfectivo(e.target.value)}
                  label="Ingrese el efectivo de su caja"
                  placeholder="$$$"
                />
                <CFormInput
                  id="idusuario"
                  name="idusuario"
                  visible={false}
                  readOnly
                  plainText
                  hidden
                  value={cookies.userLogged.idusuario}
                />
              </CCol>
            </CModalBody>
            <CModalFooter>
              <CButton color="primary" type="submit" target="form">
                Cerrar
              </CButton>
            </CModalFooter>
          </CForm>
        </CCard>
      </>
    );
  }
}
