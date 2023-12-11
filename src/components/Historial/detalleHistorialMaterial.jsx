import { useEffect, useState } from "react";
import HistorialCanjeosServices from "../../services/HistorialCanjeosServices";
import { Box, LinearProgress } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useParams } from "react-router-dom";

export function DetalleHistorialMaterial() {
    const { id } = useParams(); //agregamos esta linea porque ingresa un prop desde la ruta 
    let total = 0;

    const [data, setData] = useState(null);
    //Error del API
    const [error, setError] = useState("");
    //Booleano para establecer sí se ha recibido respuesta
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        //Lista de peliculas del API
        HistorialCanjeosServices.getHistorialCanjeoDetalleByIdCanjeo(id)
            .then(response => {
                setData(response.data.results)
                setError(response.error)
                setLoaded(true)
            })
            .catch(
                error => {
                    if (error instanceof SyntaxError) {
                        console.log(error)
                        setError(error)
                        setLoaded(false)
                        throw new Error("Respuesta no válida del servidor")
                    }
                }
            )
    }, [id]);

    if (!loaded) return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>)
    if (error) return <p>Error: {error.message}</p>



    return (
        <>
            <section className="headerFactura">
                <div style={{ textAlign: 'left' }}>
                    <h2>FACTURA</h2>
                    <p>N<sup>o</sup> Factura: {data.id}</p>
                    <p>Fecha: {data.Fecha}</p>
                    <br />
                    <h1>Cetro de acopio: </h1>
                    <p>{data.centroAcopio.nombre}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <h2>Facturado a:</h2>
                    <p>{data.usuario.NombreCompleto}</p>
                    <br />
                    <h1>Ubicado en:</h1>
                    <p>{`${data.provincia}, ${data.canton}`}</p>
                    <p>{`${data.centroAcopio.direccion}`}</p>
                </div>
            </section>
            <section className="containerFactura">
                <div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 928, border: "solid 2px" }} aria-label="simple table">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: 'primary.main' }}>
                                    <TableCell sx={{ color: 'primary.contrastText' }}>Producto</TableCell>
                                    <TableCell sx={{ color: 'primary.contrastText' }} align="center">Precio unitario</TableCell>
                                    <TableCell sx={{ color: 'primary.contrastText' }} align="center">Cantidad</TableCell>
                                    <TableCell sx={{ color: 'primary.contrastText' }} align="right">SubTotal</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data && data.materialesCanjeados.map((item) => (
                                    total += parseInt(item.subTotal),
                                    <TableRow
                                        key={item.id}
                                    >
                                        <TableCell component="th" scope="row" sx={{ borderRight: "solid 2px", backgroundColor:"white" }}>
                                            {item.descripcion}
                                        </TableCell>
                                        <TableCell align="center" sx={{ borderRight: "solid 2px" }}>{item.precio}</TableCell>
                                        <TableCell align="center" sx={{ borderRight: "solid 2px" }}>{item.cantidad}</TableCell>
                                        <TableCell align="right" sx={{ borderRight: "solid 2px" }}>{item.subTotal}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

            </section>
            <div className="total-facturado">
                <h2>Total: ₡{total}</h2>
            </div>
        </>
    )
}