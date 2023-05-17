import {
  CModal,
  CModalHeader,
  CModalTitle,
  CSmartTable,
  CModalBody,
  CModalFooter,
  CButton,
  CMultiSelect,
} from "@coreui/react-pro";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { eliminarStocks } from "@src/api/stock.api";

const columnas = [
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
  {
    key: "actions",
    label: "Actions",
    _style: { width: "10%" },
    sorter: false,
    filter: false,
  },
];

export default function Eliminar({ visible, setVisible, productos }) {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: eliminarStocks,
    onSuccess: () => {
      queryClient.invalidateQueries("stocks");
    },
  });
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
                        const data = {
                          idAlmacen: producto.idalmacen,
                          idInsumo: producto.idinsumo,
                        };
                        deleteMutation.mutate(data);
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
        </CModalFooter>
      </CModal>
    </>
  );
}
