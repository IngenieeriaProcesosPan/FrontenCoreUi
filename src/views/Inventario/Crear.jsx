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
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { obtenerAlmacenes } from "@src/api/almacen.api";
import { obtenerInsumosDisponiblesPorAlmacen } from "@src/api/insumos.api";
import { agregarStock } from "@src/api/stock.api";

export default function Crear({ visible, setVisible }) {
  const queryClient = useQueryClient();

  const onSucces = () => {
    // create toast
    window.alert("El producto a sido creado exitosamente");
    const form = document.getElementById("form");
    form.reset();
    queryClient.invalidateQueries("stocks");
    queryClient.invalidateQueries("insumosDisponibles");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const producto = Object.fromEntries(formData);
    // console.log(producto);
    addStock.mutate(producto);
  };

  const almacenes = useQuery({
    queryKey: ["almacenes"],
    queryFn: obtenerAlmacenes,
  });

  const insumos = useQuery({
    queryKey: ["insumosDisponibles"],
    queryFn: () => {
      const idalmacen = document.getElementById("idAlmacen").value ?? 1;
      return obtenerInsumosDisponiblesPorAlmacen(idalmacen);
    },
  });

  const addStock = useMutation({
    mutationFn: agregarStock,
    onSuccess: onSucces,
  });

  const cambioAlmacen = (e) => {
    queryClient.invalidateQueries("insumosDisponibles");
  };

  // *  ----------------------------------------------------- * //
  return (
    <>
      {/*pop-up de crear prpoducto */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CForm id="form" className="row g-3" onSubmit={handleSubmit}>
          <CModalHeader>
            <CModalTitle>Crear Producto</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CCol md={6}>
              <CFormSelect
                id="idAlmacen"
                name="idAlmacen"
                label="Medida del insumo"
                placeholder="kg, m, l, etc."
                options={
                  almacenes.data?.data.map((medida) => {
                    return { label: medida.nombre, value: medida.idalmacen };
                  }) || []
                }
                onChange={cambioAlmacen}
              />
            </CCol>
            <CCol md={6}>
              <CFormSelect
                id="idInsumo"
                name="idInsumo"
                label="Medida del insumo"
                options={
                  insumos.data?.data.map((insumo) => {
                    return { label: insumo.nombre, value: insumo.idinsumo };
                  }) || []
                }
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                id="cantidad"
                name="cantidad"
                label="Cantidad"
                placeholder="1234"
                type="number"
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
