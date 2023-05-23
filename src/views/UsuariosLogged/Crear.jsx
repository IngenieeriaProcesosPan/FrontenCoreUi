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
  CFormSwitch,
} from "@coreui/react-pro";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { agregarUsuario } from "@src/api/usuarios.api";

export default function Crear({ visible, setVisible }) {
  const queryClient = useQueryClient();

  const onSucces = () => {
    // create toast
    window.alert("El insumo a sido agragado exitosamente");
    const form = document.getElementById("form");
    form.reset();
    queryClient.invalidateQueries("usuarios");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const usuario = Object.fromEntries(formData);
    addUsuario.mutate(usuario);
  };

  const addUsuario = useMutation({
    mutationFn: agregarUsuario,
    onSuccess: onSucces,
  });
  return (
    <>
      {/* pop-up de crear prpoducto */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CForm id="form" className="row g-3" onSubmit={handleSubmit}>
          <CModalHeader>
            <CModalTitle>Agregar Insumo</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CCol md={6}>
              <CFormInput
                label="Usuario"
                placeholder="Nombre del usuario"
                id="nombre"
                name="nombre"
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                label="clave"
                placeholder="clave"
                type="password"
                id="clave"
                name="clave"
              />
            </CCol>
            <CCol md={6}>
              <CFormSwitch
                id="admin"
                name="admin"
                label="Admin"
                placeholder="Admin"
              />
            </CCol>
            <CCol md={6}>
              <CFormSwitch
                id="activo"
                name="activo"
                label="activo"
                placeholder="Admin"
              />
            </CCol>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Cerrar
            </CButton>
            <CButton color="primary" type="submit" target="form">
              Crear
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  );
}
