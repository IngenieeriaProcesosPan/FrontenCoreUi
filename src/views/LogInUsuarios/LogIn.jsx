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
	CSmartTable
} from '@coreui/react-pro'
import { React, useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

const columns = [
	{ key: 'id', label: 'id' },
	{ key: 'nombre', label: 'nombre' },
	{ key: 'username', label: 'nombre de usuario' }
]
const users = [
	{ id: 1, nombre: 'Pan', username: 'pan123', password: 'pan123' },
	{ id: 2, nombre: 'Torta', username: 'torta123', password: 'torta123' },
	{ id: 3, nombre: 'Croissant', username: 'croissant123', password: 'croissant123' },
	{ id: 4, nombre: 'Pan', username: 'pan123', password: 'pan123' }
]
export default function LogIn () {
	const [validated, setValidated] = useState(false)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [cookies, setCookie] = useCookies(['username', 'password'])

	// este useEffect se ejecuta cuando se monta el componente y cuando se actualiza
	useEffect(() => {
		// si username y password no estan vacios
		if (cookies.username && cookies.password) {
			// setea los valores de los cookies en los estados
			setUsername(cookies.username)
			setPassword(cookies.password)
		}
	}, [cookies])

	// esta funcion se ejecuta cuando se hace click en una fila de la tabla
	const handleTableRowClick = (item) => {
		// setea los valores de los cookies en los estados y los guarda en los cookies
		setCookie('username', item.username, { path: 'home/login' })
		setCookie('password', item.password, { path: 'home/login' })
	}

	const handleSubmit = (event) => {
		const form = event.currentTarget
		if (form.checkValidity() === false) {
			event.preventDefault()
			event.stopPropagation()
		}
		setValidated(true)
	}

	return (
		<CContainer>
			<CRow >
				<CRow >
					<CCardHeader>Usuarios</CCardHeader>
					<CCard>
						<CCardBody>
							<CSmartTable
								columns={columns}
								items={users}
								columnFilter
								pagination
								clickableRows
								itemsPerPage={2}
								tableProps={{
									hover: true
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
	)
}
