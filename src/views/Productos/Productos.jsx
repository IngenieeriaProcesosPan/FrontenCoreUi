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
import Eliminar from "./Eliminar";
import Modificar from "./Modificar";
import Crear from "./Crear";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [visibleCrear, setvisibleCrear] = useState(false);
  const [visibleModificar, setVisbleModificar] = useState(false);
  const [visibleEliminar, setVisibleEliminar] = useState(false);
  const { isLoading, data } = useQuery({
    queryKey: ["productos"],
    queryFn: getProducts,
  });

  useEffect(() => {
    getProducts().then((res) => {
      setProductos(res.data);
    });
  }, []);

  // tabla de productos disponibles
  const columns = [
    { key: "idproducto", label: "Clave" },
    { key: "descripcion", label: "Producto" },
    { key: "precio", label: "Precio" },
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

        {/*Contenedor acciones */}
        <CCol sm="6">
          <CCard>
            <CCardHeader>Acciones</CCardHeader>
            <CCardBody>
              <CButton
                color="primary"
                block="true"
                onClick={() => setvisibleCrear(!visibleCrear)}
              >
                Agregar Producto
              </CButton>
              <CButton
                color="warning"
                block="true"
                onClick={() => setVisbleModificar(!visibleModificar)}
              >
                Modificar Producto
              </CButton>
              <CButton
                color="danger"
                block="true"
                onClick={() => setVisibleEliminar(!visibleEliminar)}
              >
                Borrar Producto
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>

        {/*pop-up de crear prpoducto */}
        <Crear visible={visibleCrear} setVisible={setvisibleCrear} />

        {/*pop-up de modificar producto */}
        <Modificar
          visible={visibleModificar}
          setVisible={setVisbleModificar}
          productos={data?.data || []}
        />

        {/*pop-up de eliminar prpoducto */}
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
