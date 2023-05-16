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
} from "@coreui/react-pro";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { modificarAlmacen } from "@src/api/almacen.api";

import { useState, React } from "react";
const columnas = [
  { key: "idalmacen", label: "Clave" },
  { key: "nombre", label: "Almacen" },
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
    mutationFn: modificarAlmacen,
    onSuccess: (e) => {
      toggleDetails(Number(e.id));
      queryClient.invalidateQueries("almacenes");
    },
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
                        toggleDetails(producto.idalmacen);
                      }}
                    >
                      {details.includes(producto.idalmacen)
                        ? "Cerrar"
                        : "Modificar"}
                    </CButton>
                  </td>
                );
              },
              details: (producto) => {
                return (
                  <CCollapse visible={details.includes(producto.idalmacen)}>
                    <CCardBody>
                      <CForm className="row g-3" onSubmit={onSubmit}>
                        <CCol md={1} style={{ paddingTop: "34px" }}>
                          <CFormInput
                            type="text"
                            id="idalmacen"
                            name="idalmacen"
                            defaultValue={producto.idalmacen}
                            readOnly
                            plainText
                          />
                        </CCol>
                        <CCol md={5}>
                          <CFormInput
                            label="Nombre"
                            idalmacen={producto.idalmacen}
                            id="nombreAlmacen"
                            name="nombreAlmacen"
                            placeholder={producto.nombre}
                            defaultValue={producto.nombre}
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
