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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { agregarAlmacen } from "@src/api/almacen.api";

export default function Crear({ visible, setVisible }) {
  const queryClient = useQueryClient();

  const onSucces = () => {
    // create toast
    window.alert("El producto a sido creado exitosamente");
    const form = document.getElementById("form");
    form.reset();
    queryClient.invalidateQueries("almacenes");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const producto = Object.fromEntries(formData);
    addProduct.mutate(producto);
  };

  const addProduct = useMutation({
    mutationFn: agregarAlmacen,
    onSuccess: onSucces,
  });
  return (
    <>
      {/* pop-up de crear prpoducto */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CForm id="form" className="row g-3" onSubmit={handleSubmit}>
          <CModalHeader>
            <CModalTitle>Crear Almacen</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CCol md={6}>
              <CFormInput
                label="Nombre del Almacen"
                placeholder="Nombre del Almacen"
                id="nombreAlmacen"
                name="nombreAlmacen"
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
