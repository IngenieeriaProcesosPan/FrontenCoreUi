import { cilMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CHeader,
  CContainer,
  CHeaderToggler,
  CHeaderNav,
  CNavLink,
  CNavItem,
  CDropdown,
  CDropdownItem,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownDivider,
  CForm,
  CFormInput,
  CButton,
} from "@coreui/react-pro";
import { SidebarContext } from "@src/context/SidebarContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function AppHeader() {
  return (
    <>
      <CHeader style={{ marginBottom: "15px" }}>
        <CContainer fluid>
          <CHeaderNav>
            <CNavItem component={Link} to="rapido">
              Servicio Rapido
            </CNavItem>
            <CDropdown variant="nav-item" popper={false}>
              <CDropdownToggle color="secondary">Inventario</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem component={Link} to="inventario">
                  Inventario
                </CDropdownItem>
                <CDropdownItem component={Link} to="medidas-insumos">
                  Medidas Insumos
                </CDropdownItem>
                <CDropdownItem component={Link} to="insumos">
                  Insumos
                </CDropdownItem>
                <CDropdownItem component={Link} to="almacenes">
                  Almacenes
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CNavItem component={Link} to="productos">
              Productos
            </CNavItem>
            <CDropdown variant="nav-item" popper={false}>
              <CDropdownToggle color="secondary">Turno</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem component={Link} to="abrir-turno">
                  Abrir Turno
                </CDropdownItem>
                <CDropdownItem component={Link} to="cerrar-turno">
                  Cerrar Turno
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CDropdown variant="nav-item" popper={false}>
              <CDropdownToggle color="secondary">Usuarios</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem component={Link} to="/login">
                  Cambiar de Usuario
                </CDropdownItem>
                <CDropdownItem component={Link} to="usuariosLogged">
                  Usuarios Existentes
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </CHeaderNav>
        </CContainer>
      </CHeader>
    </>
  );
}
