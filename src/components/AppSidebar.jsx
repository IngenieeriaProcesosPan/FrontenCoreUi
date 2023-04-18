import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
  CNavGroup,
  CNavItem,
  CNavTitle,
  CBadge,
  CImage
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilPuzzle, cilUserFollow } from '@coreui/icons'
import { useContext } from 'react'
import { SidebarContext } from '@context/SidebarContext'
import { Link } from 'react-router-dom'

export default function AppSidebar() {
  const { sidebarShow, unfoldable } = useContext(SidebarContext)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      // onVisibleChange={toggleSidebar}
    >
      <CSidebarBrand>
        <CImage src="../../public/sushimi-logo-horizontal.png" height="35" />
      </CSidebarBrand>
      <CSidebarNav>
        <Link to="prueba">
          <CNavItem to="prueba">
            <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
            Dashboard
            <CBadge color="primary ms-auto">NEW</CBadge>
          </CNavItem>
        </Link>
        <CNavTitle>Reclutamiento</CNavTitle>
        <Link to="reclutamiento">
          <CNavItem to="reclutamiento">
            <CIcon customClassName="nav-icon" icon={cilUserFollow} />
            Lista de candidatos
          </CNavItem>
        </Link>
        <Link to="/">
          <CNavItem href="#">
            <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
            With badge
            <CBadge color="primary ms-auto">NEW</CBadge>
          </CNavItem>
        </Link>
        <CNavGroup toggler="Nav dropdown">
          <Link to="/">
            <CNavItem href="#">
              <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Nav dropdown
              item
            </CNavItem>
          </Link>
          <Link to="/">
            <CNavItem href="#">
              <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Nav dropdown
              item
            </CNavItem>
          </Link>
        </CNavGroup>
      </CSidebarNav>
      <CSidebarToggler />
    </CSidebar>
  )
}
