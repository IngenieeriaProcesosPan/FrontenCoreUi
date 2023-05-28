/* eslint-disable react/react-in-jsx-scope */
import { CContainer } from "@coreui/react-pro";
import ServicioRapido from "@views/ServicioRapido";
import Almacenes from "@views/Almacenes/Almacenes";
import MedidasInsumos from "@views/MedidasInsumos/MedidasInsumos";
import Insumos from "@views/Insumos/Insumos";
import Productos from "@views/Productos/Productos";
import Inventario from "@views/Inventario/Inventario";
import UsuariosLogged from "@views/UsuariosLogged/UsuariosLogged";
import LogIn from "@src/views/LogInUsuarios/LogIn";
import { Route, Routes, Navigate } from "react-router-dom";

export default function AppContainer() {
  return (
    <>
      <CContainer lg>
        <Routes>
          <Route path="/" element={<Navigate to="rapido" />} />
          <Route path="/rapido" element={<ServicioRapido />} />
          <Route path="/medidas-insumos" element={<MedidasInsumos />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/insumos" element={<Insumos />} />
          <Route path="/almacenes" element={<Almacenes />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/usuariosLogged" element={<UsuariosLogged />} />
        </Routes>
      </CContainer>
    </>
  );
}
