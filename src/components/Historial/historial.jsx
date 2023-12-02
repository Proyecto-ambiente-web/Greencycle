import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import { CardActions, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { Info } from "@mui/icons-material";

Historial.propTypes = { imagen: PropTypes.string.isRequired };
Historial.propTypes = { url: PropTypes.string.isRequired };
Historial.propTypes = { titulo: PropTypes.string.isRequired };

export function Historial({imagen, url, titulo}) {

    return (
        <Grid container sx={{ width: "100%"}} spacing={3} >
            {/*se usa map para recorrer los item de la base de datos */}
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3} >
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
                        title={titulo}
                    />
                    <CardContent >
                        <div
                            style={{ display: "flex", justifyContent: "center" }}>
                            <img src={imagen}
                                alt="imagen del material" className="ImagenMaterial" />
                        </div>
                    </CardContent>
                    <CardActions 
                        disableSpacing
                        sx={{
                            backgroundColor: (theme) => theme.palette.action.focus,
                            color: (theme) => theme.palette.common.white
                        }} >
                        <IconButton component={Link} to={url} aria-label='Detalle' sx={{ ml: 'auto', width: '100%' }} >
                            <Info className="margindeded" />
                            Detalles
                        </IconButton>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    )
}