import { useEffect, useState } from "react";
import { Box, LinearProgress } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BilleteraVirtualService from "../../../services/BilleteraVirtualService";
import { useContext } from "react";
import { UserContext } from '../../../context/UserContext';

export default function TablaMonedas() {
    
    const { user, decodeToken } = useContext(UserContext)
    const [userData, setUserData] = useState(decodeToken())

    useEffect(() => {
        setUserData(decodeToken())
    }, [user])

    const [data, setData] = useState(null);
    //Error del API
    const [error, setError] = useState("");
    //Booleano para establecer sí se ha recibido respuesta
    const [loaded, setLoaded] = useState(false);

     useEffect(() => {
        //Lista de peliculas del API
        BilleteraVirtualService.getByIdUsuario(userData.id)
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
    }, [userData.id]);
 
    if (!loaded) return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>)
    if (error) return <p>Error: {error.message}</p>

    return (
        <>  
            <section className="containerFactura">
                <div>
                    <h1 style={{marginBottom:'20px'}}>Billetera virtual</h1>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 928, border: "solid 2px" }} aria-label="simple table">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: 'primary.main' }}>
                                    <TableCell sx={{ color: 'primary.contrastText' }} align="center">Ecomonedas disponibles</TableCell>
                                    <TableCell sx={{ color: 'primary.contrastText' }} align="center">Ecomonedas canjeadas</TableCell>
                                    <TableCell sx={{ color: 'primary.contrastText' }} align="center">Ecomonedas recibidas</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                    <TableRow
                                        key={data.id}
                                    >                       
                                        <TableCell align="center" sx={{ borderRight: "solid 2px" }}>{data.disponible}</TableCell>
                                        <TableCell align="center" sx={{ borderRight: "solid 2px" }}>{data.canjeados}</TableCell>
                                        <TableCell align="center" sx={{ borderRight: "solid 2px" }}>{data.recibidos}</TableCell>
                                    </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

            </section>
        </>
    )
}