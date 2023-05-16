import {
  CModal,
  CModalHeader,
  CModalTitle,
  CSmartTable,
  CModalBody,
  CModalFooter,
  CButton,
  CCollapse,
  CCardBody,
  CForm,
  CCol,
  CFormInput,
  CFormSelect,
} from "@coreui/react-pro";

import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { getMedidasInsumo } from "@src/api/medidasInsumo.api";
import { modificarInsumo } from "@src/api/insumos.api";

import { useState, React } from "react";
const columnas = [
  { key: "idinsumo", label: "Clave" },
  { key: "nombre", label: "Insumo" },
  { key: "nombreInsumo", label: "Medida" },
  {
    key: "actions",
    label: "Actions",
    _style: { width: "10%" },
    sorter: false,
    filter: false,
  },
];

export default function Modificar({ visible, setVisible, productos }) {
  const [details, setDetails] = useState([]);
  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: modificarInsumo,
    onSuccess: (e) => {
      toggleDetails(Number(e?.id));
      queryClient.invalidateQueries("productos");
    },
  });

  const { isLoading, data } = useQuery({
    queryKey: ["medidasInsumos"],
    queryFn: getMedidasInsumo,
  });

  // Función para abrir y cerrar el collapse de modificar producto
  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  // * Función para modificar producto
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const producto = Object.fromEntries(formData);
    updateMutation.mutate(producto);
  };

  return (
    <>
      {/* pop-up de modificar prpoducto */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Modificar Producto </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CSmartTable
            activePage={1}
            clickableRows
            columns={columnas}
            columnFilter
            columnSorter
            footer
            items={productos}
            itemsPerPage={5}
            pagination
            scopedColumns={{
              actions: (producto) => {
                return (
                  <td className="py-2">
                    <CButton
                      color="primary"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => {
                        toggleDetails(producto.idinsumo);
                      }}
                    >
                      {details.includes(producto.idinsumo)
                        ? "Cerrar"
                        : "Modificar"}
                    </CButton>
                  </td>
                );
              },
              details: (producto) => {
                return (
                  <CCollapse visible={details.includes(producto.idinsumo)}>
                    <CCardBody>
                      <CForm className="row g-3" onSubmit={onSubmit}>
                        <CCol md={1} style={{ paddingTop: "34px" }}>
                          <CFormInput
                            type="text"
                            id="idInsumo"
                            name="idInsumo"
                            defaultValue={producto.idinsumo}
                            readOnly
                            plainText
                          />
                        </CCol>
                        <CCol md={5}>
                          <CFormInput
                            label="Nombre"
                            idinsumo={producto.idinsumo}
                            id="nombreInsumo"
                            name="nombreInsumo"
                            placeholder={producto.nombre}
                            defaultValue={producto.nombre}
                          />
                        </CCol>
                        <CCol md={3}>
                          <CFormSelect
                            label="Medida"
                            id="idMedida"
                            name="idMedida"
                            placeholder={producto.medida}
                            defaultValue={producto.medida}
                            options={
                              data?.data.map((medida) => {
                                return {
                                  label: medida.nombre,
                                  value: medida.idmedida,
                                };
                              }) || []
                            }
                          />
                        </CCol>
                        <CCol style={{ paddingTop: "34px" }} md={3}>
                          <CButton color="primary" type="submit">
                            Confirmar
                          </CButton>
                        </CCol>
                      </CForm>
                    </CCardBody>
                  </CCollapse>
                );
              },
            }}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
}
