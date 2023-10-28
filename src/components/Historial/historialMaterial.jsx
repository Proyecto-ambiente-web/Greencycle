import { useEffect } from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SavingsIcon from '@mui/icons-material/Savings';
import DescriptionIcon from '@mui/icons-material/Description';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import HistorialCanjeosServices from "../../services/HistorialCanjeosServices";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import PropTypes from "prop-types";

HistorialMaterial.propTypes = { idUsuario: PropTypes.string.isRequired };

export function HistorialMaterial({ idUsuario }) {
    //Resultado de consumo del API, respuesta
    const [data, setData] = useState(null);
    //Error del API
    const [error, setError] = useState("");
    //Booleano para establecer sí se ha recibido respuesta
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        //Lista de peliculas del API
        HistorialCanjeosServices.getHistorialCanjeoById(idUsuario)
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
    }, [idUsuario]);

    if (!loaded) return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>)
    if (error) return <p>Error: {error.message}</p>

    return (
        <Grid container sx={{ p: 2, display: "flex", justifyContent: "space-between", width: "100%" }} spacing={3} >
            {/*se usa map para recorrer los item de la base de datos */}
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={data.id}>
                <Card style={{ width: "280px" }}>
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
                        subheader={`Del cliente: ${data.Nombre}`}
                    />
                    <CardContent >
                        <div
                            style={{ display: "flex", justifyContent: "center" }}>
                            <img src='https://previews.123rf.com/images/aprillrain/aprillrain2212/aprillrain221200638/196354278-imagen-de-caricatura-de-un-astronauta-sentado-en-una-luna-ilustraci%C3%B3n-de-alta-calidad.jpg' alt="imagen del material" className="ImagenMaterial" />
                        </div>

                        <Typography sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: "10px" }} variant='body2' color='text.secondary'>
                            <SavingsIcon /> Fecha del canjeo: {data.Fecha}
                        </Typography>
                        <Typography sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: "10px" }} variant='body2' color='text.secondary'>
                            <DescriptionIcon /> Nombre del centro de acopio: {data.centroAcopio.nombre}
                        </Typography>
                        <Typography sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: "10px" }} variant='body2' color='text.secondary'>
                            <ColorLensIcon /> Total de ecomonedas ganadas: {data.TotalEcoMoneda}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}