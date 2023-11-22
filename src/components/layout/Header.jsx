import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LogoImage from "../../assets/images/Logo.jpg";
import { useState } from "react";
import { useEffect } from "react";
import UsuarioService from "../../services/UsuarioService";
import InfoIcon from '@mui/icons-material/Info';
import PropTypes from "prop-types";

Header.propTypes = { setIdUsuario: PropTypes.func.isRequired };
Header.propTypes = { setidTipoUsuario: PropTypes.number.isRequired };

function Header({ setIdUsuario, setidTipoUsuario }) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElMantenimiento, setAnchorElMantenimiento] =
        React.useState(null);
    const [anchorElProcesos, setAnchorElProcesos] = React.useState(null);
    const [anchorElReporte, setAnchorElReporte] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenProcesosMenu = (event) => {
        setAnchorElProcesos(event.currentTarget);
    };

    const handleCloseProcesosMenu = () => {
        setAnchorElProcesos(null);
    };

    const handleOpenMantenimientoMenu = (event) => {
        setAnchorElMantenimiento(event.currentTarget);
    };

    const handleCloseMantenimientoMenu = () => {
        setAnchorElMantenimiento(null);
    };

    const handleOpenReportesMenu = (event) => {
        setAnchorElReporte(event.currentTarget);
    };

    const handleCloseReportesMenu = () => {
        setAnchorElReporte(null);
    };

    //Resultado de consumo del API, respuesta
    const [data, setData] = useState(null);
    //Error del API
    const [error, setError] = useState("");
    //Booleano para establecer sí se ha recibido respuesta
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        //Lista de peliculas del API
        UsuarioService.getUsuarioById(5)
            .then(response => {
                setData(response.data.results)
                setError(response.error)
                setLoaded(true)
                setIdUsuario(response.data.results.id);
                setidTipoUsuario(response.data.results.idTipoUsuario);
                console.log(setIdUsuario)
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
    }, [setIdUsuario, setidTipoUsuario]);

    if (!loaded) return <InfoIcon />
    if (error) return <p>Error: {error.message}</p>


    return (
        <AppBar position="static" sx={{ backgroundColor: "primary.main" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img
                        src={LogoImage}
                        alt="Logo"
                        style={{ width: "60px", height: "auto", marginRight: "10px", borderRadius: "25px" }}
                    />

                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        GreenCycle
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {/*aquí no hace nad */}
                            <Button
                                key="Mantenimientos"
                                onClick={handleOpenMantenimientoMenu}
                                sx={{
                                    my: 2,
                                    color: "white",
                                    "&:hover": {
                                        backgroundColor: "secondary.main",
                                    },
                                    display: "block",
                                }}
                            >
                                Mantenimientos
                            </Button>
                            <Button
                                key="Procesos"
                                onClick={handleOpenProcesosMenu}
                                sx={{
                                    my: 2,
                                    color: "white",
                                    "&:hover": {
                                        backgroundColor: "secondary.main",
                                    },
                                    display: "block",
                                }}
                            >
                                Procesos
                            </Button>
                            <Button
                                key="Reportes"
                                onClick={handleOpenReportesMenu}
                                sx={{
                                    my: 2,
                                    color: "white",
                                    "&:hover": {
                                        backgroundColor: "secondary.main",
                                    },
                                    display: "block",
                                }}
                            >
                                Reportes
                            </Button>

                        </Menu>
                    </Box>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    ></Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex", marginLeft: "10px" },
                        }}
                    >
                        <Button
                            key="Mantenimientos"
                            onClick={handleOpenMantenimientoMenu}
                            sx={{
                                my: 2,
                                color: "white",
                                "&:hover": {
                                    backgroundColor: "secondary.main",
                                },
                                display: "block",
                            }}
                        >
                            Mantenimientos
                        </Button>
                        <Button
                            key="Procesos"
                            onClick={handleOpenProcesosMenu}
                            sx={{
                                my: 2,
                                color: "white",
                                "&:hover": {
                                    backgroundColor: "secondary.main",
                                },
                                display: "block",
                            }}
                        >
                            Procesos
                        </Button>
                        <Button
                            key="Reportes"
                            onClick={handleOpenReportesMenu}
                            sx={{
                                my: 2,
                                color: "white",
                                "&:hover": {
                                    backgroundColor: "secondary.main",
                                },
                                display: "block",
                            }}
                        >
                            Reportes
                        </Button>


                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title={data.NombreCompleto}>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Usuario" src="" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar-user"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {/* aquí cambia la vara */}
                            <MenuItem key="Historial" href="/Historial/" component="a">
                                <Typography textAlign="center" >Historial</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    {/**hola es para el  */}
                    <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar-procesos"
                        anchorEl={anchorElProcesos}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorElProcesos)}
                        onClose={handleCloseProcesosMenu}
                    >
                        <MenuItem component="a"
                            href="/Material/"
                            onClick={handleCloseProcesosMenu}>
                            <Typography textAlign="center">Materiales</Typography>
                        </MenuItem>
                        <MenuItem component="a"
                            href="/CentrosDeAcopio/"
                            onClick={handleCloseProcesosMenu}>
                            <Typography textAlign="center">Centros de Acopio</Typography>
                        </MenuItem>
                        <MenuItem component="a"
                            href="/CanjeoMateriales/"
                            onClick={handleCloseProcesosMenu}>
                            <Typography textAlign="center">Canjeo</Typography>
                        </MenuItem>
                    </Menu>
                    {/**parte de los mantenimientos */}
                    <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar-mantenimiento"
                        anchorEl={anchorElMantenimiento}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorElMantenimiento)}
                        onClose={handleCloseMantenimientoMenu}
                    >
                        <MenuItem
                            component="a"
                            href="/MantenimientoMaterial/"
                            onClick={handleCloseMantenimientoMenu}
                        >
                            <Typography textAlign="center">Materiales</Typography>
                        </MenuItem>
                        <MenuItem
                            component="a"
                            href="/MantenimientoCentro/"
                            onClick={handleCloseMantenimientoMenu}
                        >
                            <Typography textAlign="center">Centros de Acopio</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleCloseMantenimientoMenu}>
                            <Typography textAlign="center">Centros</Typography>
                        </MenuItem>
                    </Menu>

                    <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar-reportes"
                        anchorEl={anchorElReporte}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorElReporte)}
                        onClose={handleCloseReportesMenu}
                    >
                        <MenuItem onClick={handleCloseReportesMenu}>
                            <Typography textAlign="center">Reporte 1</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleCloseReportesMenu}>
                            <Typography textAlign="center">Reporte 2</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleCloseReportesMenu}>
                            <Typography textAlign="center">Reporte 3</Typography>
                        </MenuItem>
                    </Menu>


                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;