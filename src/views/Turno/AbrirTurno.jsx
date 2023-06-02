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
import { createProduct } from "@api/productos.api";
import { obtenerTurnoAbierto, abrirTurno } from "@src/api/turno.api";
import { useEffect } from "react";

export default function AbrirTurno({ visible, setVisible }) {
  const queryClient = useQueryClient();
  const [cookies] = useCookies(["userLogged"]);
  const { data, isLoading } = useQuery({
    queryKey: ["turnos"],
    queryFn: () => obtenerTurnoAbierto(cookies.userLogged.idusuario),
  });

  const onSucces = () => {
    // create toast
    // window.alert("El producto a sido creado exitosamente");
    // const form = document.getElementById("form");
    // form.reset();
    queryClient.invalidateQueries("turnos");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data.data.length);
    const formData = new FormData(e.target);
    const producto = Object.fromEntries(formData);
    addTurno.mutate(producto);
  };

  const addTurno = useMutation({
    mutationFn: abrirTurno,
    onSuccess: onSucces,
  });
  if (isLoading) return "Loading...";

  if (data.data.length > 0) {
    return (
      <>
        <CCard>
          <CModalHeader>
            <CModalTitle>Ya tienes un turno abierto</CModalTitle>
          </CModalHeader>
        </CCard>
      </>
    );
  }

  if (data.data.length === 0) {
    return (
      <>
        <CCard>
          <CForm id="form" className="row g-3" onSubmit={handleSubmit}>
            <CModalHeader>
              <CModalTitle>Abrir Turno</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CCol md={6}>
                <CFormInput
                  id="fondo"
                  name="fondo"
                  label="Fondo de caja"
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
                Abrir
              </CButton>
            </CModalFooter>
          </CForm>
        </CCard>
      </>
    );
  }
}
