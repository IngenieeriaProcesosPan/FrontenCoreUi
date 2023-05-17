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
  CMultiSelect,
} from "@coreui/react-pro";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { modificarStock } from "@src/api/stock.api";

import { useState } from "react";
const columnas = [
  {
    key: "nombreAlmacen",
    label: "Almacen",
    _style: { minWidth: "190px" },
    filter: (values, onChange) => {
      const unique = [...new Set(values)].sort();
      return (
        <CMultiSelect
          size="sm"
          onChange={(selected) => {
            const _selected = selected.map((element) => {
              return element.value;
            });
            onChange((item) => {
              return Array.isArray(_selected) && _selected.length
                ? _selected.includes(item.toLowerCase())
                : true;
            });
          }}
          options={unique.map((element) => {
            return {
              value: element.toLowerCase(),
              text: element,
            };
          })}
        />
      );
    },
    sorter: false,
  },
  { key: "nombreProducto", label: "Producto" },
  { key: "cantidad", label: "Cantidad" },
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
    mutationFn: modificarStock,
    onSuccess: (e) => {
      console.log(e);
      toggleDetails(Number(e.id));
      queryClient.invalidateQueries("stocks");
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
                        toggleDetails(producto._id);
                      }}
                    >
                      {details.includes(producto._id) ? "Cerrar" : "Modificar"}
                    </CButton>
                  </td>
                );
              },
              details: (producto) => {
                return (
                  <CCollapse visible={details.includes(producto._id)}>
                    <CCardBody>
                      <CForm className="row g-3" onSubmit={onSubmit}>
                        <CCol md={1} style={{ paddingTop: "34px" }}>
                          <CFormInput
                            type="text"
                            id="idAlmacen"
                            name="idAlmacen"
                            defaultValue={producto.idalmacen}
                            hidden
                            readOnly
                            plainText
                          />
                        </CCol>
                        <CCol md={1} style={{ paddingTop: "34px" }}>
                          <CFormInput
                            type="text"
                            id="idInsumo"
                            name="idInsumo"
                            hidden
                            defaultValue={producto.idinsumo}
                            readOnly
                            plainText
                          />
                        </CCol>
                        <CCol md={3}>
                          <CFormInput
                            label="Cantidad"
                            id="cantidad"
                            type="number"
                            step="0.0001"
                            name="cantidad"
                            placeholder={producto.cantidad}
                            defaultValue={producto.cantidad}
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
