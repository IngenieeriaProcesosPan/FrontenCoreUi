import {
	CModal,
	CModalHeader,
	CModalTitle,
	CModalBody,
	CModalFooter,
	CButton,
	CForm,
	CCol,
	CFormInput
} from '@coreui/react-pro'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProduct } from '@api/productos.api'

export default function Crear ({ visible, setVisible }) {
	const queryClient = useQueryClient()

	const onSucces = () => {
		// create toast
		window.alert('El insumo a sido agragado exitosamente')
		const form = document.getElementById('form')
		form.reset()
		queryClient.invalidateQueries('productos')
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const formData = new FormData(e.target)
		const usuario = Object.fromEntries(formData)
		addProduct.mutate(usuario)
	}

	const addProduct = useMutation({
		mutationFn: createProduct,
		onSuccess: onSucces
	})
	return (
		<>
			{/* pop-up de crear prpoducto */}
			<CModal visible={visible} onClose={() => setVisible(false)}>
				<CForm id="form" className="row g-3" onSubmit={handleSubmit}>
					<CModalHeader>
						<CModalTitle>Agregar Insumo</CModalTitle>
					</CModalHeader>
					<CModalBody>
						<CCol md={6}>
							<CFormInput
								label="Usuario"
								placeholder="Nombre del usuario"
								id="usuario"
								name="usuario"
							/>
						</CCol>
						<CCol md={6}>
							<CFormInput
								id="rol"
								name="rol"
								label="Rol del usuario"
								placeholder="Rol del usuario"
							/>
						</CCol>
					</CModalBody>
					<CModalFooter>
						<CButton color="secondary" onClick={() => setVisible(false)}>
              Cerrar
						</CButton>
						<CButton color="primary" type="submit" target="form">
              Crear
						</CButton>
					</CModalFooter>
				</CForm>
			</CModal>
		</>
	)
}
