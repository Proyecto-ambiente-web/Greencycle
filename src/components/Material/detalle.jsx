import { useState } from "react";
import { useEffect } from "react";
import MaterialService from "../../services/MaterialService";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useParams } from 'react-router-dom';
import SavingsIcon from '@mui/icons-material/Savings';
import DescriptionIcon from '@mui/icons-material/Description';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import ScaleIcon from '@mui/icons-material/Scale';

export function Materialdetalle() {
    const { id } = useParams(); //agregamos esta linea porque ingresa un prop desde la ruta 

    //Resultado de consumo del API, respuesta
    const [data, setData] = useState(null);
    //Error del API
    const [error, setError] = useState("");
    //Booleano para establecer sí se ha recibido respuesta
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        //Lista de peliculas del API
        MaterialService.getMaterialById(id)
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
    }, [id]); // Añade 'children' como dependencia 
    if (!loaded) return <p>Cargando...</p> 
    if (error) return <p>Error: {error.message}</p>
    return (
        <Grid container sx={{ p: 2, display: "flex", justifyContent: "center" }} spacing={3} >
            {/*se usa map para recorrer los item de la base de datos */}
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={data[0].id}>
                    <Card>
                        <CardHeader
                            sx={{
                                p: 0,
                                padding: "10px 0p",
                                backgroundColor: data[0].colorHexa,
                                color: (theme) => theme.palette.common.white,
                                //para cambiar el estilo del subheader 
                                '& .MuiCardHeader-subheader': {
                                    color: (theme) => theme.palette.common.white // Cambia 'tu-color-aqui' al color que desees
                                },
                            }}

                            style={{ textAlign: 'center' }}
                            title={data[0].Nombre}
                            subheader={data[0].TipoMaterial}
                        />
                        <CardContent >
                            <div
                                style={{ display: "flex", justifyContent: "center" }}>
                                <img src={data[0].imagen} alt="imagen del material"
                                    style={{ width: "300px", height: "auto", marginBottom: "5%", borderRadius: "15px" }} />
                            </div>
                            <Typography sx={{display:'flex', alignItems:'center', gap:'10px',marginBottom:"10px"}} variant='body2' color='text.secondary'>
                                <SavingsIcon />   EcoMonedas: {data[0].precio}
                            </Typography>
                            <Typography sx={{display:'flex', alignItems:'center', gap:'10px',marginBottom:"10px"}} variant='body2' color='text.secondary'>
                                <DescriptionIcon />   Descripción: {data[0].descripcion}
                            </Typography>
                            <Typography sx={{display:'flex', alignItems:'center', gap:'10px',marginBottom:"10px"}} variant='body2' color='text.secondary'>
                                <ColorLensIcon />   Color: {data[0].color}
                            </Typography>
                            <Typography sx={{display:'flex', alignItems:'center', gap:'10px'}} variant='body2' color='text.secondary'>
                                <ScaleIcon /> Unidad de Medida: {data[0].unidadMedida}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
        </Grid>
    )
    

}
