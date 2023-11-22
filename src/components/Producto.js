import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';



function Producto() {
    const [productos, setProductos] = useState([]);
    const [nombresDeProductos, SetNombresDeProductos] = useState([]);
    const [productosMasBaratos, setProductosMasBaratos] = useState([]);
    const [producto, setProducto] = useState({
        nombreP: '',
        precioP: '',
        sucursal: '',
    });
    


    const agregarProducto = () => {
        if (!producto.nombreP.trim() || !producto.precioP.trim() || !producto.sucursal.trim()) return;

        setProductos([...productos, producto]);
        agregarNombresSinRepetir(producto.nombreP);
        setProducto({
            nombreP: '',
            precioP: '',
            sucursal: '',
        }
        );
    };



    const agregarNombresSinRepetir = (nombre) => {
        let repetido = false;
        if (nombresDeProductos.length === 0) {
            nombresDeProductos.push(nombre);
        } else {
            if (nombresDeProductos.length === 1 && nombresDeProductos[0].toLowerCase() !== nombre.toLowerCase()) {
                nombresDeProductos.push(nombre);
            } else {
                console.log("llegue")

                for (let i = 0; i < nombresDeProductos.length && (repetido === false); i++) {

                    if (nombresDeProductos[i].toLowerCase() === nombre.toLowerCase()) {

                        repetido = true;
                    } else {
                        repetido = false;
                    }
                }
                if (repetido === false) {
                    SetNombresDeProductos([...nombresDeProductos, nombre]);

                }
            }

        }

    }

    //obtiene una lista de los precios mas baratos
    

    const listaMasBaratos = () => {
       
        let obtenerProductosRepetidos = [];//guarda los productos de un mismo tipo
        //recorre el arreglo que tiene los nombres de los productos sin repetidos
        for (let i = 0; i < nombresDeProductos.length; i++) {
            obtenerProductosRepetidos = obtenerRepetidos(nombresDeProductos[i]).slice();// se obtiene la lista de los productos de un mismo tipo  
            // ordena la lista de productos menor a mayor
            console.log(obtenerProductosRepetidos)
            obtenerProductosRepetidos.sort(function (a, b) { return a.precioP - b.precioP });
            //agrega el primer producto
            console.log(obtenerProductosRepetidos[0]);
            
            
            setProductosMasBaratos([...productosMasBaratos, obtenerProductosRepetidos[0]]);
            console.log(productosMasBaratos[0]);
            //minimo = filtrarRepetidos[0].precioP;
        };

    };
    useEffect(() => {
        
    },[productosMasBaratos]);

    //obtiene una lista de productos de una mismo nombre
    function obtenerRepetidos(producto) {
         let filtrarRepetidos = productos.filter(function (element) {
            return element.nombreP.toUpperCase() === producto.toUpperCase();
        });
        return filtrarRepetidos;
    }




    return (
        <Container>
            <h1>Comparador de precios </h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Producto: </Form.Label>
                    <Form.Control type="text" placeholder="Ingrese Producto" value={producto.nombreP}
                        onChange={(e) => setProducto({ ...producto, nombreP: e.target.value })} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicNumber">
                    <Form.Label>Precio: </Form.Label>
                    <Form.Control type="number" placeholder="Ingrese Precio" value={producto.precioP}
                        onChange={(e) => setProducto({ ...producto, precioP: e.target.value })} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Sucursal</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese Sucursal" value={producto.sucursal}
                        onChange={(e) => setProducto({ ...producto, sucursal: e.target.value })} />
                </Form.Group>

                <Button variant="primary" type="button" onClick={() => agregarProducto()}>
                    Agragar Producto
                </Button>
                <Button variant="primary" type="button" onClick={() => listaMasBaratos()}>
                    Productos mas Barato
                </Button>
            </Form>
            <div>
                <h2>Lista de Productos</h2>

            </div>




            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre de Producto</th>
                        <th>Precio</th>
                        <th>Sucursal</th>
                    </tr>
                </thead>
                <tbody>

                    {productos.map((producto, pro) => (
                        <tr>

                            <td>{pro + 1}</td>
                            <td>Producto: {producto.nombreP}</td>
                            <td>Precio: {producto.precioP}</td>
                            <td>Sucursal: {producto.sucursal}</td>

                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}


export default Producto;