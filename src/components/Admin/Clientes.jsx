import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect } from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import UsuarioService from "../../services/UsuarioService";

export function Clientes() {
    const [data, setData] = useState(null);
    //Error del API
    const [error, setError] = useState("");
    //Booleano para establecer sí se ha recibido respuesta
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        UsuarioService.getClientes(3) //tipo del cliente
            .then((response) => {
                console.log(response);
                setData(response.data.results)
                setError(response.error)
                setLoaded(true)
            })
            .catch((error) => {
                if (error instanceof SyntaxError) {
                    console.log(error)
                    setError(error)
                    setLoaded(false)
                    throw new Error("Respuesta no válida del servidor")
                }
            });
    }, []);

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
                                    color: (theme) => theme.palette.common.white // Cambia 'tu-color-aqui' alf color que desees
                                },
                            }}

                            style={{ textAlign: 'center' }}
                            title={item.NombreCompleto}
                        />
                        <CardContent
                            style={{ textAlign: 'left' }}
                        >
                            <div
                                style={{ display: "flex", justifyContent: "center" }}>
                                <img src='https://i.pinimg.com/564x/4d/77/e2/4d77e2ffb4b616928c6242b94f6cfefd.jpg' alt="cliente" style={{height:'auto', width:'70%', marginBottom: '15px'}} />
                            </div>

                            <Typography variant='body2' color='text.secondary' className="textoIzquierda">
                                <EmailIcon />   Correo: {item.Correo}
                            </Typography>
                            <Typography variant='body2' color='text.secondary' className="textoIzquierda">
                               <LocalPhoneIcon /> Teléfono: {item.Telefono}
                            </Typography>
                            <Typography variant='body2' color='text.secondary' className="textoIzquierda">
                                <PersonPinCircleIcon />   Provincia: {item.provincia}
                            </Typography>
                            <Typography variant='body2' color='text.secondary' className="textoIzquierda">
                                <PersonPinCircleIcon />  Cantón: {item.canton}
                            </Typography>
                            <Typography variant='body2' color='text.secondary' className="textoIzquierda">
                                <PersonPinCircleIcon />  Distrito: {item.distrito}
                            </Typography>  
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}