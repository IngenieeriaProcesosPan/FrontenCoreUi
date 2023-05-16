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
} from "@coreui/react-pro";
import { useQuery } from "@tanstack/react-query";

import { getProducts } from "@api/productos.api";
import { getMedidasInsumo } from "@src/api/medidasInsumo.api";

import Eliminar from "./Eliminar";
import Modificar from "./Modificar";
import Crear from "./Crear";

const Insumos = () => {
  const [productos, setProductos] = useState([]);
  const [visibleCrear, setvisibleCrear] = useState(false);
  const [visibleModificar, setVisbleModificar] = useState(false);
  const [visibleEliminar, setVisibleEliminar] = useState(false);
  const { isLoading, data } = useQuery({
    queryKey: ["medidasInsumos"],
    queryFn: getMedidasInsumo,
  });

  // tabla de productos disponibles
  const columns = [
    { key: "idmedida", label: "Clave" },
    { key: "nombre", label: "Nombre" },
  ];

  return (
    <CContainer>
      <CRow className="d-flex flex-row">
        <CCol className="w-50">
          <CCard>
            <CCardHeader>Medidas Insumos</CCardHeader>
            <CCardBody>
              <CSmartTable
                columns={columns}
                items={data?.data || []}
                tableFilter
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
                color="success"
                block="true"
                onClick={() => setvisibleCrear(!visibleCrear)}
              >
                Agregar Medidas
              </CButton>
              <CButton
                color="info"
                block="true"
                onClick={() => setVisbleModificar(!visibleModificar)}
              >
                Modificar Medidas
              </CButton>
              <CButton
                color="danger"
                block="true"
                onClick={() => setVisibleEliminar(!visibleEliminar)}
              >
                Borrar Medidas
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

export default Insumos;
