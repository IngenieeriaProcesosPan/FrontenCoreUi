import { useState, useEffect, React } from 'react';
import { CCardHeader ,CCardBody ,CButton ,CCard, CContainer, CSmartTable, CRow, CCol } from '@coreui/react-pro';

// esto se va a borrar se usara los datos de la api
const products = [
	{ id: 1, name: 'Pan', price: 1.5, quantity: 0, total: 0 },
	{ id: 2, name: 'Torta', price: 3.5, quantity: 0, total: 0 },
	{ id: 3, name: 'Croissant', price: 1.0, quantity: 0, total: 0 },
];


export default function ServicioRapido() {
	// estos son los estados o hooks
	const [loading, setLoading] = useState();
	const [cart, setCart] = useState([]);
	const [items, setItems] = useState(products);
	const [totalMax, setTotal] = useState(0);


	// tabla de carrito de compras
	const columns = [
		{ key: 'name', label: 'Producto' },
		{ key: 'price', label: 'Precio' },
		{	key: 'quantity', label :'Cantidad'},
		{ key: 'total', label: 'Total' },
		{
			key: 'actions',
			label: 'Actions',
			_style: { width: '10%' },
			// sorter es para que no se pueda ordenar por esta columna
			sorter: false,
			// filter es para que no se pueda filtrar por esta columna
			filter: false,
		},
	];


	// tabla de productos disponibles
	const columns2 = [
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


	// funcion para cambiar la cantidad de productos
	const handleQuantityChange = (item, value) => {
		// esta funcion mapea los items y devuelve todos los items menos el que se quiere cambiar
		const updatedItems = cart.map((i) =>
			i.id === item.id
			// si el id del item es igual al id del item que se quiere cambiar se devuelve el item con la cantidad cambiada
			// el spread operator (...) es para que se devuelva el item con todas sus propiedades y solo se cambie la cantidad
				? { ...i, quantity: parseInt(value), total: parseInt(value) * i.price }
				: i	);
		setCart(updatedItems);
		setTotal(calculateTotal(updatedItems));
	};

	// funcion para eliminar un producto
	const handleRemoveItem = (item) => {
		// esta funcion filtra los items y devuelve todos los items que no sean el que se quiere eliminar
		const updatedItems = cart.filter((i) => i.id !== item.id);
		setCart(updatedItems);
		setTotal(calculateTotal(updatedItems));
	};

	// funcion para calcular el total
	const calculateTotal = (items) => {
		// el metodo reduce sirve para sumar los valores de un array y el 0 es el valor inicial
		return items.reduce((total, item) => total + item.total, 0);
	};

	// funcion para agregar un producto al carrito
	const handleAddToCart = (item) => {
		// si el item ya esta en el carrito se actualiza la cantidad y el total del item en el carrito
		if (cart.find((i) => i.id === item.id)) {
			const updatedCart = cart.map((i) =>
				i.id === item.id
					? { ...i, quantity: i.quantity + 1, total: (i.quantity + 1) * i.price }
					: i
			);
			return setCart(updatedCart), setTotal(totalMax + item.price);
		}
		// si el item no esta en el carrito se agrega al carrito con cantidad 1 y total igual al precio
		const cartItem = {
			...item,
			quantity: 1,
			total: item.price,
		};
		// se agrega el item al carrito y se suma el total set cart es para agregar el item al carrito
		setCart([...cart, cartItem]);
		setTotal(totalMax + item.price);
	};

	// // funcion para traer los datos de la api
	// const getUsers = useEffect(() => {
	// 	setLoading(true);
	// 	fetch('https://rickandmortyapi.com/api/character')
	// 		.then((response) => response.json())
	// 		.then((result) => {
	// 			console.log(result.results);
	// 			setUsers(result.results);
	// 			setLoading(false);
	// 		});
	// }, []);


	return (
		<CContainer>
			<CRow className="d-flex flex-row">
				<CCol className="w-50">
					<CCard>
						<CCardHeader>Carrito de Compras</CCardHeader>
						<CCardBody>
							<CSmartTable
								columns={columns}
								items={cart}
								tableFilter
								tablesorter='true'
								footer
								hover='true'
								responsive='true'
								scopedColumns={{
									quantity: (item) => (
										<input
											type="number"
											value={item.quantity}
											onChange={(product) => handleQuantityChange(item, product.target.value)}
										/>
									),
									actions: (item) => (
										<>
											<CButton
												size="sm"
												variant="outline"
												color="danger"
												onClick={() => handleRemoveItem(item)}
											>
												Eliminar
											</CButton>
										</>
									),
								}}
							>
							</CSmartTable>
							<hr />
							<div className='futter d-flex justify-content-between '>
								<strong>Total:{totalMax}</strong>
								<CButton variant="outline"  color="success">Finalizar</CButton>
							</div>
						</CCardBody>
					</CCard>
				</CCol>

				<CCol className="w-50">
					<CCard>
						<CCardHeader>Productos Disponibles</CCardHeader>
						<CCardBody>
							<CSmartTable
								columns={columns2}
								items={products}
								tableFilter
								tablesorter='true'
								footer
								hover='true'
								responsive='true'
								scopedColumns={{
									actions: (item) => (
										<>
											<CButton
												size="sm"
												variant="outline"
												color="success"
												onClick={() => handleAddToCart(item)}
											>
              Agregar
											</CButton>
										</>
									),
								}}
							/>
						</CCardBody>
					</CCard>
				</CCol>
			</CRow>
		</CContainer>
	);
}