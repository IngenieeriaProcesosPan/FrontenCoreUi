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
  CFormSelect,
} from "@coreui/react-pro";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { agregarInsumo } from "@src/api/insumos.api";
import { getMedidasInsumo } from "@src/api/medidasInsumo.api";

export default function Crear({ visible, setVisible }) {
  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery({
    queryKey: ["medidasInsumos"],
    queryFn: getMedidasInsumo,
  });

  const onSucces = () => {
    // create toast
    window.alert("El insumo a sido agragado exitosamente");
    const form = document.getElementById("form");
    form.reset();
    queryClient.invalidateQueries("insumos");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const producto = Object.fromEntries(formData);
    addProduct.mutate(producto);
  };

  const addProduct = useMutation({
    mutationFn: agregarInsumo,
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
                label="Nombre del insumo"
                placeholder="Nombre del insumo"
                id="nombreInsumo"
                name="nombreInsumo"
              />
            </CCol>
            <CCol md={6}>
              <CFormSelect
                id="idMedida"
                name="idMedida"
                label="Medida del insumo"
                placeholder="kg, m, l, etc."
                options={
                  data?.data.map((medida) => {
                    return { label: medida.nombre, value: medida.idmedida };
                  }) || []
                }
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
