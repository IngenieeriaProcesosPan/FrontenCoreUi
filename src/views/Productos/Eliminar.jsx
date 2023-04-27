import {
  CModal,
  CModalHeader,
  CModalTitle,
  CSmartTable,
  CModalBody,
  CModalFooter,
  CButton,
} from "@coreui/react-pro";
import { useState, useEffect } from "react";
const columnas = [
  { key: "idproducto", label: "Clave" },
  { key: "descripcion", label: "Producto" },
  { key: "precio", label: "Precio" },
];

export default function Eliminar({ visible, setVisible, productos }) {
  const [listaID, setListaID] = useState([]);
  const onClick = () => {
    console.log(listaID);
  };
  useEffect(() => {
    setListaID([]);
  }, [visible]);
  return (
    <>
      {/*pop-up de eliminar prpoducto */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Eliminar Producto</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CSmartTable
            activePage={1}
            columns={columnas}
            columnFilter
            footer
            items={productos}
            itemsPerPage={5}
            pagination
            selectable
            onSelectedItemsChange={(items) => {
              setListaID(
                items
                  .filter((item) => item._selected)
                  .map((item) => item.idproducto)
              );
            }}
            scopedColumns={{}}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cerrar
          </CButton>
          <CButton color="primary" onClick={onClick}>
            Borrar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
}
