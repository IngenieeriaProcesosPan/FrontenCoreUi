/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect, React } from 'react';
import { CCardHeader ,CCardBody ,CButton ,CCard, CContainer, CSmartTable, CRow, CCol } from '@coreui/react-pro';
import '@src/scss/ServicioRapido.scss';

// esto se va a borrar se usara la api
const products = [
	{ id: 1, name: 'Pan', price: 1.5, quantity: 0, total: 0 },
	{ id: 2, name: 'Torta', price: 3.5, quantity: 0, total: 0 },
	{ id: 3, name: 'Croissant', price: 1.0, quantity: 0, total: 0 },
];
const columns = [
	{ key: 'name', label: 'Producto' },
	{ key: 'price', label: 'Precio' },
	{ key: 'quantity', label: 'Cantidad' },
	{ key: 'total', label: 'Total' },
	{
		key: 'actions',
		label: 'Actions',
		_style: { width: '1%' },
		sorter: false,
		filter: false,
	},
];

export default function ServicioRapido() {
	const [loading, setLoading] = useState();
	const [users, setUsers] = useState([]);
	const [items, setItems] = useState(products);
	const [total, setTotal] = useState(0);

	const handleQuantityChange = (item, value) => {
		const updatedItems = items.map((i) =>
			i.id === item.id ? { ...i, quantity: value, total: value * i.price } : i
		);
		setItems(updatedItems);
		setTotal(calculateTotal(updatedItems));
	};

	const handleRemoveItem = (item) => {
		const updatedItems = items.filter((i) => i.id !== item.id);
		setItems(updatedItems);
		setTotal(calculateTotal(updatedItems));
	};

	const calculateTotal = (items) => {
		return items.reduce((total, item) => total + item.total, 0);
	};




	const getUsers = useEffect(() => {
		setLoading(true);
		fetch('https://rickandmortyapi.com/api/character')
			.then((response) => response.json())
			.then((result) => {
				console.log(result.results);
				setUsers(result.results);
				setLoading(false);
			});
	}, []);

	return (
		<CContainer>
			<CRow className="d-flex flex-row">
				<CCol className="w-50">
					<CCard>
						<CCardHeader>Carrito de Compras</CCardHeader>
						<CCardBody>
							<CSmartTable
								columns={columns}
								items={items}
								tableFilter
								tablesorter='true'
								footer
								hover='true'
								responsive='true'
							>
								{(item,) => {
									return (
										<>
											<td>{item.name}</td>
											<td>{item.price}</td>
											<td>
												<input
													type="number"
													min="0"
													value={item.quantity}
													onChange={(e) => handleQuantityChange(item, e.target.value)}
												/>
											</td>
											<td>{item.total.toFixed(2)}</td>
											<td>
												<CButton color="danger" className="ml-1" >
											Eliminar
												</CButton>
											</td>
										</>
									);
								}}
							</CSmartTable>
							<hr />
							<div>
								<strong>Total:{total}</strong>
							</div>
						</CCardBody>
					</CCard>
				</CCol>

				<CCol className="w-50">
					<CCard>
						<CSmartTable
							columns={columns}
							columnFilter
							columnSorter
							footer
							items={users}
							loading={loading}
							tableProps={{
								hover: true,
								responsive: true,
							}}
						/>
					</CCard>
				</CCol>
			</CRow>
		</CContainer>
	);
}