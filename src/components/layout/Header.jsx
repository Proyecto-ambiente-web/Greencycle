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
//import UsuarioService from "../../services/UsuarioService";
//import InfoIcon from '@mui/icons-material/Info';
import { useContext } from "react";
import { UserContext } from '../../context/UserContext';
import MenuList from '@mui/material/MenuList';

function Header() {
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

    //obtener la informacion del usuario logueado
    //autorizar para ocultar enlaces
    const { user, decodeToken, autorize } = useContext(UserContext)
    const [userData, setUserData] = useState(decodeToken())

    useEffect(() => {
        setUserData(decodeToken())

    }, [user])

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
                        {user && autorize({ allowedRoles: ['Administrador'] }) &&
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
                        }
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
                        {user && autorize({ allowedRoles: ['Administrador', 'Administrador centro acopio'] }) &&
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
                        }
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {userData && (
                            <Tooltip title={userData.email}>
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Usuario" src="" />
                                </IconButton>
                            </Tooltip>
                        )}

                        {!userData && (
                            <Tooltip title='usuario'>
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Usuario" src="" />
                                </IconButton>
                            </Tooltip>
                        )}

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
                            {user && autorize({ allowedRoles: ['Cliente'] }) &&
                                <MenuItem key="Historial" href="/HistorialCliente/" component="a">
                                    <Typography textAlign="center" >Historial</Typography>
                                </MenuItem>
                            }
                            {user && autorize({ allowedRoles: ['Administrador centro acopio'] }) &&
                                <MenuItem key="Historial" href="/HistorialCentro/" component="a">
                                    <Typography textAlign="center" >Historial</Typography>
                                </MenuItem>
                            }

                            {!userData && (
                                <MenuList>
                                    <MenuItem component='a' href='/user/login'>
                                        <Typography textAlign="center">Iniciar Sesión</Typography>
                                    </MenuItem>
                                    <MenuItem component='a' href='/user/CreateCliente'>
                                        <Typography textAlign="center">Registrarse</Typography>
                                    </MenuItem>

                                </MenuList>
                            )}

                            {userData && (
                                <MenuList>
                                    <MenuItem>
                                        <Typography variant='subtitle1' gutterBottom>
                                            {userData?.email}
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem color='secondary' component='a' href='/user/logout'>
                                        <Typography textAlign='center'>Cerrar Sesión</Typography>
                                    </MenuItem>
                                </MenuList>
                            )}
                            {userData && (
                                <MenuList>
                                    <MenuItem color='secondary' component='a' href='/CambiarContraseña'>
                                        <Typography textAlign='center'>Cambiar Contraseña</Typography>
                                    </MenuItem>
                                </MenuList>
                            )}


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
                        {user && autorize({ allowedRoles: ['Administrador centro acopio'] }) &&
                            <MenuItem component="a"
                                href="/CanjeoMateriales/"
                                onClick={handleCloseProcesosMenu}>
                                <Typography textAlign="center">Canjeo de Materiales</Typography>
                            </MenuItem>
                        }
                        {user && autorize({ allowedRoles: ['Administrador'] }) &&
                            <MenuList>
                                <MenuItem component="a"
                                    href="/Clientes/"
                                    onClick={handleCloseProcesosMenu}>
                                    <Typography textAlign="center">Lista de clientes</Typography>
                                </MenuItem>


                            </MenuList>

                        }
                        {user && autorize({ allowedRoles: ['Cliente'] }) &&
                            <MenuList>
                                <MenuItem component="a"
                                    href="/TablaMonedas/"
                                    onClick={handleCloseProcesosMenu}>
                                    <Typography textAlign="center">Billetera</Typography>
                                </MenuItem>

                                <MenuItem component="a"
                                    href="/CanjeCupones/"
                                    onClick={handleCloseProcesosMenu}>
                                    <Typography textAlign="center">Canjeo de cupones</Typography>
                                </MenuItem>
                            </MenuList>


                        }
                    </Menu>
                    {/**parte de los mantenimientos */}
                    {user && autorize({ allowedRoles: ['Administrador'] }) &&
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
                            <MenuItem component='a' href='/MantenimientoAdminCentro'>
                                <Typography textAlign="center">Actualizar Admin del Centro</Typography>
                            </MenuItem>
                            <MenuItem component="a"
                                href="/TablaCupones/"
                                onClick={handleCloseProcesosMenu}>
                                <Typography textAlign="center">Cupones</Typography>
                            </MenuItem>
                        </Menu>
                    }
                    {user && autorize({ allowedRoles: ["Administrador centro acopio", "Administrador"] }) &&
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
                            {user && autorize({ allowedRoles: ['Administrador centro acopio'] }) &&
                                <MenuList>
                                    <MenuItem component='a' href='/ReporteXAdmin'>
                                        <Typography textAlign="center">Reportes del centro</Typography>
                                    </MenuItem>
                                </MenuList>
                            }

                            {user && autorize({ allowedRoles: ['Administrador'] }) &&
                                <MenuItem component='a' href='/ReporteXAdminAplicacion'>
                                    <Typography textAlign="center">Reporte Administración</Typography>
                                </MenuItem>
                            }
                        </Menu>

                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;