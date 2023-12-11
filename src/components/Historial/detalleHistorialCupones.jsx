import { useContext, useState } from "react";
import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import CuponUsuarioService from "../../services/CuponUsuarioService";
import DiscountIcon from '@mui/icons-material/Discount';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { UserContext } from "../../context/UserContext";
import EventBusyIcon from '@mui/icons-material/EventBusy';

export function DetalleHistorialCupones() {
    //Resultado de consumo del API, respuesta
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
        //Lista de peliculas del API
        CuponUsuarioService.getCuponByIdUsuario(userData.id)
            .then(response => {
                setData(response.data.results[0])
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
    }, [userData.id]); // Añade 'children' como dependencia 
    if (!loaded)  return (
        <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>)
    if (error) return <p>Error: {error.message}</p>
    return (
        <Grid container sx={{ p: 2, display: "flex", justifyContent: "center" }} spacing={3} >
            {/*se usa map para recorrer los item de la base de datos */}
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={data.id}>
                    <Card>
                        <CardHeader
                            sx={{
                                p: 0,
                                padding: "10px 0p",
                                backgroundColor: '#101820',
                                color: (theme) => theme.palette.common.white,
                                //para cambiar el estilo del subheader 
                                '& .MuiCardHeader-subheader': {
                                    color: (theme) => theme.palette.common.white // Cambia 'tu-color-aqui' al color que desees
                                },
                            }}

                            style={{ textAlign: 'center' }}
                            title= {data.Nombre}
                            subheader={data.tipoCupon}
                        />
                        <CardContent >
                        <div
                                style={{ display: "flex", justifyContent: "center" }}>
                                <img src='https://i.pinimg.com/564x/1c/96/24/1c962494caa827f03c5666edf9371f8d.jpg' alt="imagen del informe" className="ImagenMaterial" />
                            </div>
                            <Typography variant='body2' color='text.secondary' sx={{display:'flex', alignItems:'center', gap:'10px',marginBottom:"10px"}}>
                                <DiscountIcon /> {data.descripcion}
                            </Typography>
                            <Typography variant='body2' color='text.secondary' sx={{display:'flex', alignItems:'center', gap:'10px',marginBottom:"10px"}}>
                                <MonetizationOnIcon /> Cantidad de Ecomonedas: {data.CantidadEcomonedas}
                            </Typography>
                            <Typography sx={{display:'flex', alignItems:'center', gap:'10px',marginBottom:"10px"}} variant='body2' color='text.secondary'>
                                <EventAvailableIcon />   Fecha de Inicio: {data.FechaInicio}
                            </Typography>
                            <Typography sx={{display:'flex', alignItems:'center', gap:'10px'}} variant='body2' color='text.secondary'>
                                <EventBusyIcon /> Fecha final: {data.FechaFinal}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
        </Grid>
    )
}
