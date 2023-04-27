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
} from "@coreui/react-pro";

export default function Crear({ visible, setVisible }) {
  return (
    <>
      {/*pop-up de crear prpoducto */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Crear Producto</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3">
            <CCol md={6}>
              <CFormInput
                label="Nombre del Producto"
                placeholder="Nombre del producto"
              />
            </CCol>
            <CCol md={6}>
              <CFormInput label="Precio del Prodicto" placeholder="$$$" />
            </CCol>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cerrar
          </CButton>
          <CButton color="primary">Crear</CButton>
        </CModalFooter>
      </CModal>
    </>
  );
}
