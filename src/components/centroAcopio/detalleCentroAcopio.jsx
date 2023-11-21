import { useEffect, useState } from "react";
import "../../App.css"
import CentroAcopioServices from "../../services/CentroAcopioServices";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import DirectionsIcon from "@mui/icons-material/Directions";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import ScaleIcon from '@mui/icons-material/Scale';
import SavingsIcon from '@mui/icons-material/Savings';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export function DetalleCentroAcopio() {
    const params = useParams(); //agregamos esta linea porque ingresa un prop desde la ruta 

    //Resultado de consumo del API, respuesta
    const [data, setData] = useState(null);
    //Error del API
    const [error, setError] = useState("");
    //Booleano para establecer sí se ha recibido respuesta
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        //Lista de peliculas del API
        CentroAcopioServices.getCentroAcopioById(params.id)
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
    }, [params.id])
    if (!loaded) return (
        <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>)
    if (error) return <p>Error: {error.message}</p>

    return (
        <Grid container sx={{ p: 2, display: "grid", placeItems: "center", width: '100%' }} spacing={3} >
            {/*se usa map para recorrer los item de la base de datos */}
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={data.id} >
                <Card>
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
                        title={data.nombre}
                        subheader={`Administrador: ${data.usuario.NombreCompleto}`}
                    />
                    <CardContent >
                        <Typography sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: "10px" }} variant='body2' color='text.secondary'>
                            <DirectionsIcon /> Dirección: {data.direccion}
                        </Typography>
                        <Typography sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: "10px" }} variant='body2' color='text.secondary'>
                            <LocalPhoneIcon /> Teléfono: {data.telefono}
                        </Typography>
                        <Typography sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: "10px" }} variant='body2' color='text.secondary'>
                            <HistoryToggleOffIcon /> Horario: {data.horario}
                        </Typography>
                        
                    </CardContent>
                </Card>
                <Typography variant='h4' style={{marginTop: "5%", textAlign:'center'}}> Materiales del centro de acopio</Typography>
            </Grid>


            <div className="container">
                <Grid container sx={{ p: 2, display: "flex", justifyContent: "center" }} spacing={3} >
                    
                    {/*se usa map para recorrer los item de la base de datos */}
                    {data && data.Materiales ?
                        data.Materiales.map((item) => ( //el map es solo para listas json o arrays

                            <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={item.id}>
                                <Card>
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
                                    <CardContent>
                                        <div
                                            style={{ display: "flex", justifyContent: "center" }}>
                                            <img src={item.imagen} alt="imagen del material"
                                                className="ImagenMaterial" />
                                        </div>
                                        <Typography className="textoIzquierda" variant='body2' color='text.secondary'>
                                            <SavingsIcon />   EcoMonedas: {item.precio}
                                        </Typography>
                                        <Typography className="textoIzquierda" variant='body2' color='text.secondary'>
                                            <ScaleIcon /> Unidad de Medida: {item.unidadMedida}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )) :
                        <Typography sx={{textAlign:'center',marginTop: "3%", fontWeight: "bold"}} variant='body2' color='text.secondary'>
                            Centro de acopio no tienen registrado materiales...
                        </Typography>
                    }
                </Grid>
            </div>
        </Grid>
    )
}