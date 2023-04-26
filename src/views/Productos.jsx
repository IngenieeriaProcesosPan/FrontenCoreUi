import { useState, useEffect, React } from 'react';
import { CBadge,CCollapse,CFormCheck,CFormSelect,CFormInput ,CForm, CModalTitle,CModalFooter, CCardHeader ,CCardBody ,CButton ,CCard, CContainer, CSmartTable, CRow, CCol, CModal, CModalHeader, CModalBody } from '@coreui/react-pro';


// esto se va a borrar se usara los datos de la api
const products = [
	{ id: 1, name: 'Pan', price: 1.5, quantity: 0, total: 0 },
	{ id: 2, name: 'Torta', price: 3.5, quantity: 0, total: 0 },
	{ id: 3, name: 'Croissant', price: 1.0, quantity: 0, total: 0 },
	{ id: 4, name: 'concha', price: 4, quantity: 0, total: 0 },
	{ id: 5, name: 'cuernito', price: 5, quantity: 0, total: 0 },
	{ id: 6, name: 'dona', price: 2.0, quantity: 0, total: 0 },
];

const Productos = () => {
	const [details, setDetails] = useState([]);
	const [items, setItems] = useState(products);
	const [crear, setCreate] = useState(false);
	const [modify, setModify] = useState(false);
	const [eliminar, setDelete] = useState(false);

	// tabla de productos disponibles
	const columns = [
		{	key: 'id', label :'Clave'},
		{ key: 'name', label: 'Producto' },
		{ key: 'price', label: 'Precio' },
	];

	// tabla de borrar producto
	const columns2 = [
		{	key: 'id', label :'Clave'},
		{ key: 'name', label: 'Producto' },
		{ key: 'price', label: 'Precio' },
		{
			key: 'actions',
			label: 'Actions',
			_style: { width: '10%' },
			sorter: false,
			filter: false,
		},
	];

	// Función para abrir y cerrar el collapse de modificar producto
	const toggleDetails = (index) => {
		const position = details.indexOf(index);
		let newDetails = details.slice();
		if (position !== -1) {
			newDetails.splice(position, 1);
		} else {
			newDetails = [...details, index];
		}
		setDetails(newDetails);
	};

	// Función para cerrar la ventana modal
	const handleCloseCreate = () => {
		setCreate(false);
	};

	const handleCloseDelete = () => {
		setDelete(false);
	};

	const handleCloseModify = () => {
		setModify(false);
	};
	return (
		<CContainer>
			<CRow className="d-flex flex-row">
				<CCol className="w-50">
					<CCard>
						<CCardHeader>Catalogo</CCardHeader>
						<CCardBody>
							<CSmartTable
								columns={columns}
								items={items}
								tableFilter
								tablesorter='true'
								footer
								hover='true'
								responsive='true'
								scopedColumns={{}}
							/>
						</CCardBody>
					</CCard>
				</CCol>

				{/*Contenedor acciones */}
				<CCol sm="6">
					<CCard>
						<CCardHeader>Acciones</CCardHeader>
						<CCardBody>
							<CButton color="primary" block='true' onClick={() => setCreate(!crear)}>Agregar Producto</CButton>
							<CButton color="warning" block='true' onClick={() => setModify(!modify)}>Modificar Producto</CButton>
							<CButton color="danger" block='true' onClick={() => setDelete(!eliminar)}>Borrar Producto</CButton>
						</CCardBody>
					</CCard>
				</CCol>

				{/*pop-up de crear prpoducto */}
				<CModal visible={crear} >
					<CModalHeader>
						<CModalTitle>Crear Producto</CModalTitle>
					</CModalHeader>
					<CModalBody>
						<CForm className="row g-3">
							<CCol md={6}>
								<CFormInput  label="Nombre del Producto" placeholder="pan"/>
							</CCol>
							<CCol md={6}>
								<CFormInput  label="Precio del Prodicto"  placeholder="0"/>
							</CCol>
							<CCol md={6}>
								<CFormInput  label="Clave"   placeholder="0"/>
							</CCol>
						</CForm>
					</CModalBody>
					<CModalFooter>
						<CButton color="secondary" onClick={() => handleCloseCreate()}>
          Cerrar
						</CButton>
						<CButton color="primary">Crear</CButton>
					</CModalFooter>
				</CModal>


				{/*pop-up de modificar prpoducto */}
				<CModal visible={modify} >
					<CModalHeader>
						<CModalTitle>Modificar Producto </CModalTitle>
					</CModalHeader>
					<CModalBody>

						<CSmartTable
							activePage={1}
							clickableRows
							columns={columns2}
							columnFilter
							columnSorter
							footer
							items={items}
							itemsPerPage={5}
							pagination
							scopedColumns={{
								actions: (item) => {
									return (
										<td className="py-2">
											<CButton
												color="primary"
												variant="outline"
												shape="square"
												size="sm"
												onClick={() => {
													toggleDetails(item.id);
												}}
											>
												{details.includes(item.id) ? 'Cerrar' : 'Modificar'}
											</CButton>
										</td>
									);
								},
								details: (item) => {
									return (
										<CCollapse visible={details.includes(item.id)}>
											<CCardBody>
												<CForm className="row g-3">
													<CCol md={6}>
														<CFormInput  label="Nombre del Producto" placeholder={item.name}/>
													</CCol>
													<CCol md={6}>
														<CFormInput  label="Precio del Prodicto"  placeholder={item.price}/>
													</CCol>
													<CCol md={6}>
														<CFormInput  label="Clave"  placeholder={item.id}/>
													</CCol>
												</CForm>
											</CCardBody>
										</CCollapse>

									);
								},
							}}

						/>

					</CModalBody>
					<CModalFooter>
						<CButton color="secondary" onClick={() => handleCloseModify()}>
          Cerrar
						</CButton>
						<CButton color="primary">Confirmar</CButton>
					</CModalFooter>
				</CModal>


				{/*pop-up de eliminar prpoducto */}
				<CModal visible={eliminar} >
					<CModalHeader>
						<CModalTitle>Eliminar Producto</CModalTitle>
					</CModalHeader>
					<CModalBody>
						<CSmartTable
							activePage={1}
							clickableRows
							columns={columns}
							columnFilter
							footer
							items={items}
							itemsPerPage={5}
							pagination
							selectable
							scopedColumns={{}}
						/>
					</CModalBody>
					<CModalFooter>
						<CButton color="secondary" onClick={() => handleCloseDelete()}>
          Cerrar
						</CButton>
						<CButton color="primary">Borrar</CButton>
					</CModalFooter>
				</CModal>


			</CRow>
		</CContainer>
	);
};

export default Productos;