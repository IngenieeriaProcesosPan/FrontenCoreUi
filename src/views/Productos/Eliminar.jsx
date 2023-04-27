import {
  CModal,
  CModalHeader,
  CModalTitle,
  CSmartTable,
  CModalBody,
  CModalFooter,
  CButton,
} from "@coreui/react-pro";

const columnas = [
  { key: "idproducto", label: "Clave" },
  { key: "descripcion", label: "Producto" },
  { key: "precio", label: "Precio" },
];

export default function Eliminar({ visible, setVisible, productos }) {
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
            clickableRows
            columns={columnas}
            columnFilter
            footer
            items={productos}
            itemsPerPage={5}
            pagination
            selectable
            scopedColumns={{}}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cerrar
          </CButton>
          <CButton color="primary">Borrar</CButton>
        </CModalFooter>
      </CModal>
    </>
  );
}
