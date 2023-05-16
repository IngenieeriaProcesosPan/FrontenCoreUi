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
		const producto = Object.fromEntries(formData)
		addProduct.mutate(producto)
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
								label="Nombre del insumo"
								placeholder="Nombre del insumo"
								id="descripcion"
								name="descripcion"
							/>
						</CCol>
						<CCol md={6}>
							<CFormInput
								id="precio"
								name="precio"
								label="Precio del insumo"
								placeholder="$$$"
							/>
						</CCol>
						<CCol md={6}>
							<CFormInput
								id="medida"
								name="medida"
								label="Medida del insumo"
								placeholder="kg, m, l, etc."
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
