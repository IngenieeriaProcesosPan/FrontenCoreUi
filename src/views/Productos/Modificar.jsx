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

import { useState } from "react";
const columnas = [
  { key: "idproducto", label: "Clave" },
  { key: "descripcion", label: "Producto" },
  { key: "precio", label: "Precio" },
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

  return (
    <>
      {/*pop-up de modificar prpoducto */}
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
                        toggleDetails(producto.idproducto);
                      }}
                    >
                      {details.includes(producto.idproducto)
                        ? "Cerrar"
                        : "Modificar"}
                    </CButton>
                  </td>
                );
              },
              details: (producto) => {
                return (
                  <CCollapse visible={details.includes(producto.idproducto)}>
                    <CCardBody>
                      <CForm className="row g-3">
                        <CCol md={6}>
                          <CFormInput
                            label="Nombre del Producto"
                            placeholder={producto.descripcion}
                          />
                        </CCol>
                        <CCol md={6}>
                          <CFormInput
                            label="Precio del Producto"
                            placeholder={producto.precio}
                          />
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
          <CButton color="primary">Confirmar</CButton>
        </CModalFooter>
      </CModal>
    </>
  );
}
