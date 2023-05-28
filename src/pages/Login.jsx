import {
  CButton,
  CForm,
  CCol,
  CFormInput,
  CRow,
  CCardHeader,
  CCardBody,
  CCard,
  CContainer,
  CSmartTable,
} from "@coreui/react-pro";
import { React, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import { useQuery, useMutation } from "@tanstack/react-query";
import { obtenerUsuarios, validarUsuario } from "@src/api/usuarios.api";

const columns = [
  { key: "idusuario", label: "id" },
  { key: "nombre", label: "nombre" },
];
const users = [
  { id: 1, nombre: "Pan", username: "pan123", password: "pan123" },
  { id: 2, nombre: "Torta", username: "torta123", password: "torta123" },
  {
    id: 3,
    nombre: "Croissant",
    username: "croissant123",
    password: "croissant123",
  },
  { id: 4, nombre: "Pan", username: "pan123", password: "pan123" },
];
export default function Login() {
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["userLogged"]);
  const { isLoading, data } = useQuery({
    queryKey: ["usuarios"],
    queryFn: obtenerUsuarios,
  });

  useEffect(() => {
    removeCookie("userLogged");
  }, []);

  const validateUser = useMutation({
    mutationFn: validarUsuario,
    onSuccess: (data) => {
      if (data.data) {
        setCookie("userLogged", JSON.stringify(data.data));
        window.location.href = "/home";
      } else {
        alert("usuario invalido");
      }
    },
  });

  // esta funcion se ejecuta cuando se hace click en una fila de la tabla
  const handleTableRowClick = (item) => {
    setUsername(item.idusuario);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const usuario = Object.fromEntries(formData);
    console.log(usuario);
    validateUser.mutate(usuario);
  };

  return (
    <CContainer>
      <CRow>
        <CRow>
          <CCardHeader>Usuarios</CCardHeader>
          <CCard>
            <CCardBody>
              <CSmartTable
                columns={columns}
                items={data?.data || []}
                columnFilter
                pagination
                clickableRows
                itemsPerPage={2}
                tableProps={{
                  hover: true,
                }}
                onRowClick={(item) => handleTableRowClick(item)}
              ></CSmartTable>
            </CCardBody>
          </CCard>
        </CRow>

        <CRow className="mt-4">
          <CCardHeader>LogIn</CCardHeader>
          <CCard>
            <CCardBody>
              <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
              >
                <CCol md={4}>
                  <CFormInput
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    feedbackValid="Se mira bien!"
                    id="validationUsername"
                    name="idusuario"
                    label="Nombre de usuario"
                    feedbackInvalid="provee un nombre de usuario valido"
                    required
                  />
                </CCol>

                <CCol md={5}>
                  <CFormInput
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="inputPassword"
                    name="clave"
                    label="Contraseña"
                    aria-describedby="inputGroupPrependFeedback"
                    feedbackInvalid="provee una contraseña"
                    required
                  />
                </CCol>

                <CCol xs={12}>
                  <CButton color="primary" type="submit">
                    Confirmar
                  </CButton>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CRow>
      </CRow>
    </CContainer>
  );
}
