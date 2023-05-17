import { useState, useEffect, React } from "react";
import {
  CCardHeader,
  CCardBody,
  CButton,
  CCard,
  CContainer,
  CSmartTable,
  CRow,
  CCol,
  CMultiSelect,
} from "@coreui/react-pro";
import { useQuery } from "@tanstack/react-query";

import { obtenerStocks } from "@src/api/stock.api";

import Eliminar from "./Eliminar";
import Modificar from "./Modificar";
import Crear from "./Crear";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [visibleCrear, setvisibleCrear] = useState(false);
  const [visibleModificar, setVisbleModificar] = useState(false);
  const [visibleEliminar, setVisibleEliminar] = useState(false);
  const { isLoading, data } = useQuery({
    queryKey: ["stocks"],
    queryFn: obtenerStocks,
  });

  // tabla de productos disponibles
  const columns = [
    {
      key: "nombreAlmacen",
      label: "Almacen",
      _style: { minWidth: "200px" },
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
  ];

  return (
    <CContainer>
      <CRow className="d-flex flex-row">
        <CCol className="w-50">
          <CCard>
            <CCardHeader>Catalogo</CCardHeader>
            <CCardBody>
              <CSmartTable
                columns={columns}
                columnFilter
                columnSorter
                items={data?.data || []}
                tablesorter="true"
                footer
                hover="true"
                responsive="true"
                scopedColumns={{}}
                loading={isLoading}
              />
            </CCardBody>
          </CCard>
        </CCol>

        {/* Contenedor acciones */}
        <CCol sm="6">
          <CCard>
            <CCardHeader>Acciones</CCardHeader>
            <CCardBody>
              <CButton
                color="primary"
                block="true"
                onClick={() => setvisibleCrear(!visibleCrear)}
              >
                Agregar Stock
              </CButton>
              <CButton
                color="warning"
                block="true"
                onClick={() => setVisbleModificar(!visibleModificar)}
              >
                Modificar Stock
              </CButton>
              <CButton
                color="danger"
                block="true"
                onClick={() => setVisibleEliminar(!visibleEliminar)}
              >
                Borrar Stock
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>

        {/* pop-up de crear prpoducto */}
        <Crear visible={visibleCrear} setVisible={setvisibleCrear} />

        {/* pop-up de modificar producto */}
        <Modificar
          visible={visibleModificar}
          setVisible={setVisbleModificar}
          productos={data?.data || []}
        />

        {/* pop-up de eliminar prpoducto */}
        <Eliminar
          visible={visibleEliminar}
          setVisible={setVisibleEliminar}
          productos={data?.data || []}
        />
      </CRow>
    </CContainer>
  );
};

export default Productos;
