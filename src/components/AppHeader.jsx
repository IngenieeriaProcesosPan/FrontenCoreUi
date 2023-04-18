// import { useState } from 'react'
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
            <CNavItem component={Link} to="inventario">
              Inventario
            </CNavItem>
            <CNavItem component={Link} to="productos">
              Productos
            </CNavItem>
            <CNavItem component={Link} to="productos">
              Corte
            </CNavItem>
            <CNavItem component={Link} to="productos">
              Usuarios
            </CNavItem>
          </CHeaderNav>
        </CContainer>
      </CHeader>
    </>
  );
}
