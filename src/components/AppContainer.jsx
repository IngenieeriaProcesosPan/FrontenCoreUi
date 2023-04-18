import { CContainer } from "@coreui/react-pro";
import ServicioRapido from "@src/views/ServicioRapido";
import { Route, Routes, Navigate } from "react-router-dom";

export default function AppContainer() {
  return (
    <>
      <CContainer lg>
        <Routes>
          <Route path="/" element={<Navigate to="rapido" />} />
          <Route path="/rapido" element={<ServicioRapido />} />
          <Route path="/prueba" element={<>hola</>} />
          <Route path="/inventario" element={<>inventario</>} />
        </Routes>
      </CContainer>
    </>
  );
}
