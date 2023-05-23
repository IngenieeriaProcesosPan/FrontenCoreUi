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
import { eliminarUsuario } from "@src/api/usuarios.api";

const columnas = [
  { key: "idusuario", label: "Id" },
  { key: "nombre", label: "Usuario" },
  { key: "administrador", label: "Admin" },
  { key: "activo", label: "Activo" },
  {
    key: "actions",
    label: "Actions",
    _style: { width: "10%" },
    sorter: false,
    filter: false,
  },
];

export default function Eliminar({ visible, setVisible, productos }) {
  const [listaID, setListaID] = useState([]);
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: eliminarUsuario,
    onSuccess: () => {
      queryClient.invalidateQueries("usuarios");
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
                        deleteMutation.mutate(producto.idusuario);
                      }}
                    >
                      Borrar
                    </CButton>
                  </td>
                );
              },
            }}
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
