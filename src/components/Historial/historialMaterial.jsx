import HistorialCanjeosServices from "../../services/HistorialCanjeosServices";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect } from "react";
import { useState } from "react";
//import PropTypes from "prop-types";
import { Card, CardActions, CardContent, CardHeader, Grid, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Info } from "@mui/icons-material";
import informeImagen from "../../assets/images/informe.png";
import SavingsIcon from '@mui/icons-material/Savings';
import DateRangeIcon from '@mui/icons-material/DateRange';
import HomeIcon from '@mui/icons-material/Home';
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";


export function HistorialMaterial() {
    const [data, setData] = useState(null);
    //Error del API
    const [error, setError] = useState("");
    //Booleano para establecer sí se ha recibido respuesta
    const [loaded, setLoaded] = useState(false);

    //obtener la informacion del usuario logueado
    //autorizar para ocultar enlaces
    const { user, decodeToken } = useContext(UserContext)
    const [userData, setUserData] = useState(decodeToken())

    useEffect(() => {
        setUserData(decodeToken())

    }, [user])


    useEffect(() => {
        HistorialCanjeosServices.getHistorialCanjeoByIdUsuario(userData.id )
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
    }, [userData]);

    if (!loaded) return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>)
    if (error) return <p>Error: {error.message}</p>

    return (
        <Grid container sx={{ p: 2, display: "flex", justifyContent: "center" }} spacing={3} >
            {/*se usa map para recorrer los item de la base de datos */}
            {data && data.map((item) => ( //el map es solo para listas json o arrays 
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={item.id}>
                    <Card sx={{
                        transition: 'transform 500ms', // Agrega una transición suave
                        '&:hover': {
                            transform: 'scale(0.95)', // Aumenta el tamaño al hacer hover
                        },
                    }}>
                        <CardHeader
                            sx={{
                                p: 0,
                                padding: "10px 0p",
                                backgroundColor: '#215b4a',
                                color: (theme) => theme.palette.common.white,
                                //para cambiar el estilo del subheader 
                                '& .MuiCardHeader-subheader': {
                                    color: (theme) => theme.palette.common.white // Cambia 'tu-color-aqui' al color que desees
                                },
                            }}

                            style={{ textAlign: 'center' }}
                            title={"Historial de Canjes de Materiales"}
                            subheader={`Del usuario: ${item.Nombre}`}
                        />
                        <CardContent
                            style={{ textAlign: 'left' }}
                        >
                            <div
                                style={{ display: "flex", justifyContent: "center" }}>
                                <img src={informeImagen} alt="imagen del informe" className="ImagenMaterial" />
                            </div>

                            <Typography variant='body2' color='text.secondary' className="textoIzquierda">
                                <DateRangeIcon /> {item.Fecha}
                            </Typography>
                            <Typography variant='body2' color='text.secondary' className="textoIzquierda">
                                <HomeIcon />   Nombre:  {item.nombreAcopio}
                            </Typography>
                            <Typography variant='body2' color='text.secondary' className="textoIzquierda">
                                <HomeIcon />   Codigo del centro:  {item.idCentroAcopio}
                            </Typography>
                            <Typography variant='body2' color='text.secondary' className="textoIzquierda">
                                <SavingsIcon />   EcoMonedas: {item.TotalEcoMoneda}
                            </Typography>
                        </CardContent>
                        <CardActions
                            disableSpacing
                            sx={{
                                backgroundColor: (theme) => theme.palette.action.focus,
                                color: (theme) => theme.palette.common.white
                            }} >
                            <IconButton component={Link} to={`/DetalleHistorialMaterial/${item.id}`} aria-label='Detalle' sx={{ ml: 'auto', width: '100%' }} >
                                <Info className="margindeded" />
                                Detalles
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}