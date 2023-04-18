import { useState, useEffect } from "react";
import { CCard, CContainer, CSmartTable, CRow, CCol } from "@coreui/react-pro";

export default function ServicioRapido() {
  const [loading, setLoading] = useState();
  const [users, setUsers] = useState([]);
  const columns = [
    {
      key: "id",
      _style: { minWidth: "130px" },
    },
    {
      key: "name",
      _style: { minWidth: "130px" },
    },
    "type",
    {
      key: "status",
      _style: { minWidth: "120px" },
    },
    {
      key: "species",
    },
  ];
  const getUsers = useEffect(() => {
    setLoading(true);
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((result) => {
        console.log(result.results);
        setUsers(result.results);
        setLoading(false);
      });
  }, []);

  return (
    <CContainer>
      <CRow>
        <CCol>
          <CCard>
            <CSmartTable
              columns={columns}
              columnFilter
              columnSorter
              footer
              items={users}
              itemsPerPageSelect
              loading={loading}
              pagination
              tableProps={{
                hover: true,
                responsive: true,
              }}
            />
          </CCard>
        </CCol>
        <CCol>
          <CCard>
            <CSmartTable
              columns={columns}
              columnFilter
              columnSorter
              footer
              items={users}
              loading={loading}
              tableProps={{
                hover: true,
                responsive: true,
              }}
            />
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
}
