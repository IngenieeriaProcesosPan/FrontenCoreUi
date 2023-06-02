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
  CRow,
} from "@coreui/react-pro";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { actualizarEfectivo } from "@src/api/turno.api";
import { useState } from "react";
import { useEffect } from "react";

export default function Dashboard({
  visible,
  setVisible,
  total,
  idturno,
  setCart,
  setTotal,
}) {
  const queryClient = useQueryClient();
  const [efectivo, setEfectivo] = useState(0);

  const onSucces = () => {
    // create toast
    setCart([]);
    setTotal(0);
    setVisible(false);
    const form = document.getElementById("form");
    form.reset();
  };

  useEffect(() => {
    setEfectivo(0);
  }, [visible]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct.mutate({ idturno, efectivo: total });
  };

  const addProduct = useMutation({
    mutationFn: actualizarEfectivo,
    onSuccess: onSucces,
  });
  return (
    <>
      {/*pop-up de crear prpoducto */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CForm id="form" className="row g-3" onSubmit={handleSubmit}>
          <CModalHeader>
            <CModalTitle>Crear Producto</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol md={6}>
                <CFormInput
                  label="Efectivo Recibido"
                  placeholder="$$$"
                  id="descripcion"
                  name="descripcion"
                  onChange={(e) => setEfectivo(e.target.value)}
                />
              </CCol>
              <CCol md={6}>
                <h3 style={{ paddingTop: "30px" }}>Total: ${total}</h3>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={6}></CCol>
              <CCol md={6}>
                <h3 style={{ paddingTop: "30px" }}>
                  Cambio: ${efectivo - total}
                </h3>
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Cerrar
            </CButton>
            <CButton color="primary" type="submit" target="form">
              Cobrar
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  );
}
