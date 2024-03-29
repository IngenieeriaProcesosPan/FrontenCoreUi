import { useState, useEffect, React } from "react";
import {
  CCardHeader,
  CCardBody,
  CButton,
  CCard,
  CContainer,
  CSmartTable,
  CRow,
  CCol,
  CModalHeader,
  CModalTitle,
} from "@coreui/react-pro";
import { getProducts } from "@api/productos.api";
import { obtenerTurnoAbierto, abrirTurno } from "@src/api/turno.api";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import Dashboard from "./Dashboard";
// productos disponibles para comprar
const products = getProducts;

export default function ServicioRapido() {
  // estos son los estados o hooks
  const [loading, setLoading] = useState();
  const [visibleCobrar, setvisibleCobrar] = useState(false);
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState(products);
  const [totalMax, setTotal] = useState(0);
  const [cookies] = useCookies(["userLogged"]);

  const { data, isLoading } = useQuery({
    queryKey: ["turno"],
    queryFn: () => obtenerTurnoAbierto(cookies.userLogged.idusuario),
  });

  useEffect(() => {
    getProducts().then((res) => {
      setItems(res.data);
    });
  }, []);

  // tabla de carrito de compras
  const columns = [
    { key: "descripcion", label: "Producto" },
    { key: "precio", label: "Precio" },
    { key: "quantity", label: "Cantidad" },
    { key: "total", label: "Total" },
    {
      key: "actions",
      label: "Actions",
      _style: { width: "10%" },
      // sorter es para que no se pueda ordenar por esta columna
      sorter: false,
      // filter es para que no se pueda filtrar por esta columna
      filter: false,
    },
  ];

  // tabla de productos disponibles
  const columns2 = [
    { key: "descripcion", label: "Producto" },
    { key: "precio", label: "Precio" },
    {
      key: "actions",
      label: "Actions",
      _style: { width: "10%" },
      sorter: false,
      filter: false,
    },
  ];

  // funcion para cambiar la cantidad de productos
  const handleQuantityChange = (item, value) => {
    // esta funcion mapea los items y devuelve todos los items menos el que se quiere cambiar
    const updatedItems = cart.map((i) =>
      i.idproducto === item.idproducto
        ? // si el idproducto del item es igual al idproducto del item que se quiere cambiar se devuelve el item con la cantidad cambiada
          // el spread operator (...) es para que se devuelva el item con todas sus propiedades y solo se cambie la cantidad
          { ...i, quantity: parseInt(value), total: parseInt(value) * i.precio }
        : i
    );

    setCart(updatedItems);
    setTotal(calculateTotal(updatedItems));
    console.log(cart);
  };

  // funcion para eliminar un producto
  const handleRemoveItem = (item) => {
    // esta funcion filtra los items y devuelve todos los items que no sean el que se quiere eliminar
    const updatedItems = cart.filter((i) => i.idproducto !== item.idproducto);
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
    if (cart.find((i) => i.idproducto === item.idproducto)) {
      const updatedCart = cart.map((i) =>
        i.idproducto === item.idproducto
          ? {
              ...i,
              quantity: i.quantity + 1,
              total: (i.quantity + 1) * parseFloat(i.precio),
            }
          : i
      );
      setCart(updatedCart);
      setTotal(calculateTotal(updatedCart));
      return;
    }
    // si el item no esta en el carrito se agrega al carrito con cantidad 1 y total igual al precio
    const cartItem = {
      ...item,
      quantity: 1,
      total: parseFloat(item.precio),
    };
    // se agrega el item al carrito y se suma el total set cart es para agregar el item al carrito
    setCart([...cart, cartItem]);
    setTotal(calculateTotal([...cart, cartItem]));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data.data.length === 0) {
    return (
      <>
        <CCard>
          <CModalHeader>
            <CModalTitle>Abra un turno antes de cobrar productos</CModalTitle>
          </CModalHeader>
        </CCard>
      </>
    );
  }

  return (
    <>
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
                  tablesorter="true"
                  footer
                  hover="true"
                  responsive="true"
                  scopedColumns={{
                    quantity: (item) => (
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(product) =>
                          handleQuantityChange(item, product.target.value)
                        }
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
                ></CSmartTable>
                <hr />
                <div className="futter d-flex justify-content-between ">
                  <strong>Total:{totalMax}</strong>
                  <CButton
                    variant="outline"
                    color="success"
                    onClick={(e) => setvisibleCobrar(true)}
                  >
                    Finalizar
                  </CButton>
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
                  items={items}
                  tableFilter
                  tablesorter="true"
                  footer
                  hover="true"
                  responsive="true"
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
      <Dashboard
        visible={visibleCobrar}
        setVisible={setvisibleCobrar}
        idturno={data.data[0].idturno}
        total={totalMax}
        setCart={setCart}
        setTotal={setTotal}
      />
    </>
  );
}
