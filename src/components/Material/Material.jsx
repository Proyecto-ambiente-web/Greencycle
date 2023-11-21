import { useState } from "react";
import { useEffect } from "react";
import MaterialService from "../../services/MaterialService";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { Info } from "@mui/icons-material";
import "../../App.css"
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export function ListMateriales() {
    //Resultado de consumo del API, respuesta
    const [data, setData] = useState(null);
    //Error del API
    const [error, setError] = useState("");
    //Booleano para establecer sí se ha recibido respuesta
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        //Lista de peliculas del API
        MaterialService.getMateriales()
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
    }, [])
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
                                backgroundColor: item.colorHexa,
                                color: (theme) => theme.palette.common.white,
                                //para cambiar el estilo del subheader 
                                '& .MuiCardHeader-subheader': {
                                    color: (theme) => theme.palette.common.white // Cambia 'tu-color-aqui' al color que desees
                                },
                            }}

                            style={{ textAlign: 'center' }}
                            title={item.Nombre}
                            subheader={item.TipoMaterial}
                        />
                        <CardContent
                            style={{ textAlign: 'left' }}
                        >
                            <div
                                style={{ display: "flex", justifyContent: "center" }}>
                                <img src={item.imagen} alt="imagen del material" className="ImagenMaterial" />
                            </div>
                            
                            <Typography variant='body2' color='text.secondary' className="textoIzquierda">
                                Ecomonedas: {item.precio}
                            </Typography>
                            <Typography variant='body2' color='text.secondary' className="textoIzquierda">
                                Descripción:    {item.descripcion}
                            </Typography>
                            <Typography variant='body2' color='text.secondary' className="textoIzquierda">
                                Color:    {item.color}
                            </Typography>
                        </CardContent>
                        <CardActions id={item.id}
                            disableSpacing
                            sx={{
                                backgroundColor: (theme) => theme.palette.action.focus,
                                color: (theme) => theme.palette.common.white
                            }} >
                            <IconButton component={Link} to={`/Materialdetalle/${item.id}`} aria-label='Detalle' sx={{ ml: 'auto', width: '100%' }} >
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