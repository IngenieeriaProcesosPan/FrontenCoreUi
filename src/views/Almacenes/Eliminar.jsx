import {
  CModal,
  CModalHeader,
  CModalTitle,
  CSmartTable,
  CModalBody,
  CModalFooter,
  CButton,
} from "@coreui/react-pro";
import { useState, useEffect, React } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { eliminarAlmacenes } from "@src/api/almacen.api";

const columnas = [
  { key: "idalmacen", label: "Clave" },
  { key: "nombre", label: "Almacen" },
];

export default function Eliminar({ visible, setVisible, productos }) {
  const [listaID, setListaID] = useState([]);
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: eliminarAlmacenes,
    onSuccess: () => {
      queryClient.invalidateQueries("almacenes");
    },
  });
  const onClick = () => {
    deleteMutation.mutate(listaID);
  };
  return (
    <>
      {/* pop-up de eliminar prpoducto */}
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
                  .map((item) => item.idalmacen)
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
