/* eslint-disable react/react-in-jsx-scope */
import { CContainer } from '@coreui/react-pro'
import ServicioRapido from '@src/views/ServicioRapido'
import Almacenes from '@src/views/Almacenes/Almacenes'
import Insumos from '@src/views/Insumos/Insumos'
import Productos from '@src/views/Productos/Productos'
import UsuariosLogged from '@src/views/UsuariosLogged/UsuariosLogged'
import { Route, Routes, Navigate } from 'react-router-dom'

export default function AppContainer () {
	return (
		<>
			<CContainer lg>
				<Routes>
					<Route path="/" element={<Navigate to="rapido" />} />
					<Route path="/rapido" element={<ServicioRapido />} />
					<Route path="/insumos" element={<Insumos />} />
					<Route path="/almacenes" element={<Almacenes />} />
					<Route path="/productos" element={<Productos />} />
					<Route path="/usuariosLogged" element={<UsuariosLogged />} />
				</Routes>
			</CContainer>
		</>
	)
}
