import { useContext, useEffect, useState } from "react";
import { Box, FormControl, Button, Grid, LinearProgress } from "@mui/material";
//import { SelectCupones } from "./Form/SelectCupones";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import UsuarioService from "../../services/UsuarioService";
import { FormHelperText } from '@mui/material';
import CuponesServices from "../../services/CuponesServices";
import { CuponesForm } from './Form/CuponesForm';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../context/UserContext";
import CuponUsuarioService from "../../services/CuponUsuarioService";

export function CanjeCupones() {
    const navigate = useNavigate();

    const obtenerFechaActual = () => {
        const fecha = new Date();
        const formatoFecha = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}-${fecha.getDate().toString().padStart(2, '0')}`;
        return formatoFecha;
   };

    //Error del API
    const [error, setError] = useState("");

    //autorizar para ocultar enlaces
    const { user, decodeToken } = useContext(UserContext)
    const [userData, setUserData] = useState(decodeToken())
    const [ecomonedasRequeridas, setEcomonedasRequeridas] = useState(0);

    useEffect(() => {
        setUserData(decodeToken())
    }, [user])

    const [dataUser, setdataUser] = useState(null);
    const [loadedUser, setLoadedUser] = useState(false);
    useEffect(() => {
        //Lista de centros del API
        UsuarioService.getUsuarioBilletera(userData.id)
            .then(response => {
                setdataUser(response.data.results)
                setError(response.error)
                setLoadedUser(true)
            })
            .catch(
                error => {
                    if (error instanceof SyntaxError) {
                        console.log(error)
                        setError(error)
                        setLoadedUser(false)
                        throw new Error("Respuesta no válida del servidor")
                    }
                }
            )
    }, [userData]);


    const {
        control,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: {
            idUsuario: userData.id,
            cupones: [
                {
                    cupon_id: '',
                    cantidad: '',
                    precio: '',
                    subTotal: ''
                },
            ],
            fecha: obtenerFechaActual(),
            total: 0
        },

    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'cupones',
    });

    // Si ocurre error al realizar el submit
    const onError = (errors, e) => console.log(errors, e);

    const limpiarDetalle = () => {
        const cuerpoTabla = document.getElementById("table-body");
        cuerpoTabla.innerHTML = "";
    };

    const obtenerCupon = (cuponId) => {
        return dataCupon.find((item) => item.id === cuponId) || null;
    };

    const actualizarTotal = () => {
        const valores = getValues()
        let total = 0;
        let tabla = '';
        let bandera = false;

        limpiarDetalle();
        valores.cupones.map((item) => {
            if (item.cantidad && item.cantidad != 0 && !isNaN(item.cantidad)) {
                const cupon = obtenerCupon(item.cupon_id);
                const subTotal = parseInt(item.cantidad) * cupon.CantidadEcomonedas;
                total += subTotal;

                if (total <= dataUser.disponible) {
                    tabla += `<tr>
                            <td>${cupon.descripcion}</td>
                            <td>${item.cantidad}</td>
                            <td>${cupon.CantidadEcomonedas}</td>
                            <td>${subTotal}</td>
                          </tr>`;
                    setValue('total', total)
                    setEcomonedasRequeridas(total)
                } else {
                    bandera = true;
                    setValue('total', "")
                }
            }

            if (bandera) {
                toast.error("Ecomonedas insuficientes", {
                    duration: 4000,
                    position: 'top-center',
                });
                return;
            }
        });

        document.getElementById("table-body").innerHTML += tabla;
    }

    const handleInputChange = (index, name, value) => {
        setValue(name, value)
        const valores = getValues()
        console.log(valores.cupones[index])
        let total = 0, tabla = '', cupon, subTotal = 0, indice = 0;
        let bandera = false;
        let disponible = dataUser.disponible;

        limpiarDetalle();
        valores.cupones.map((item) => {
            cupon = obtenerCupon(item.cupon_id);

            if (!item.cantidad || item.cantidad == 0) {
                setValue('total', "")
                setEcomonedasRequeridas(0)
                limpiarDetalle();
                return;
            }

            if (isNaN(item.cantidad)) {
                toast.error("Debe ingresar una cantidad numérica", {
                    duration: 2000,
                    position: "top-center",
                });
                setEcomonedasRequeridas(0)
                limpiarDetalle();
                return;
            }

            subTotal = parseInt(item.cantidad) * cupon.CantidadEcomonedas;
            total += subTotal;
            disponible = disponible - total;
            setEcomonedasRequeridas(total)

            if (disponible < 0) {
                bandera = true;
                setValue('total', "");
            }

            if (total <= parseInt(dataUser.disponible) && !bandera) {
                tabla += `<tr>
                        <td>${cupon.descripcion}</td>
                        <td>${item.cantidad}</td>
                        <td>${cupon.CantidadEcomonedas}</td>
                        <td>${subTotal}</td>
                      </tr>`;

                setValue(`cupones[${indice}].precio`, cupon.CantidadEcomonedas)
                setValue(`cupones[${indice}].subTotal`, subTotal)
                setValue('total', total)
            } else {
                bandera = true;
                setValue('total', "")
            }

            if (bandera) {
                toast.error("Ecomonedas insuficientes", {
                    duration: 4000,
                    position: 'top-center',
                });
                return;
            }
            indice++;
        });

        document.getElementById("table-body").innerHTML += tabla;
    }

    const removeCupon = (index) => {
        if (fields.length === 1) {
            return;
        }

        remove(index);
        actualizarTotal();
    };

    const addNewCupon = () => {
        append({
            cupon_id: '',
            cantidad: '',
            precio: '',
            subTotal: ''
        });
    };

    const onSubmit = (DataForm) => {
        console.log('Formulario:');
        console.log(DataForm);
        let hasError = false;
        const cuponIdSet = new Set();

        try {
            if (DataForm.cupones[0].cupon_id == "") {
                toast.error("Se requiere seleccionar mínimo un cupón", {
                    duration: 4000,
                    position: 'top-center',
                });
                return;
            }

            if (ecomonedasRequeridas > parseInt(dataUser.disponible)
                || parseInt(DataForm.total) > parseInt(dataUser.disponible)) {

                toast.error("Ecomonedas insuficientes", {
                    duration: 4000,
                    position: 'top-center',
                });
                return;
            }

            DataForm.cupones.forEach((element) => {
                if (hasError) {
                    return;
                }

                if (cuponIdSet.has(element.cupon_id)) {
                    toast.error("No se permiten cupones duplicados", {
                        duration: 4000,
                        position: 'top-center',
                    });

                    hasError = true;
                }

                cuponIdSet.add(element.cupon_id);

                if (element.cantidad == 0 || !element.cantidad) {
                    toast.error("Debe ingresar la cantidad del cupón", {
                        duration: 4000,
                        position: 'top-center',
                    });

                    hasError = true;
                }

                if (isNaN(element.cantidad)) {
                    toast.error("Debe ingresar una cantidad numérica", {
                        duration: 4000,
                        position: 'top-center',
                    });

                    hasError = true;
                }
            });

            if (hasError) {
                return;
            }


            //Crear canjeo
            CuponUsuarioService.crearCuponUsuario(DataForm)
                .then((response) => {
                    console.log(response);
                    setError(response.error);
                    //Respuesta al usuario de creación
                    //if (response.data.results != null) {
                        toast.success("Compra realizada", {
                            duration: 4000,
                            position: 'top-center',
                        });

                        return navigate('/HistorialCliente');
                    //}
                })
                .catch((error) => {
                    if (error instanceof SyntaxError) {
                        console.log(error);
                        setError(error);
                        throw new Error('Respuesta no válida del servidor');
                    }
                });
        } catch (e) {
            //Capturar error
        }
    };

    const [dataCupon, setdataCupon] = useState({});
    const [loadedCupon, setloadedCupones] = useState(false);
    useEffect(() => {
        CuponesServices.getCupones()
            .then((response) => {
                console.log(response);
                setdataCupon(response.data.results);
                setloadedCupones(true);
            })
            .catch((error) => {
                if (error instanceof SyntaxError) {
                    console.log(error);
                    setError(error);
                    setloadedCupones(false);
                    throw new Error('Respuesta no válida del servidor');
                }
            });
    }, []);

    if (!loadedUser) return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>)
    if (error) return <p>Error: {error.message}</p>

    return (
        <>
            <section className="containerCanjeo">
                <section className="infoCange">
                    <div className="infoCentro" style={{ textAlign: 'left' }}>
                        <div>
                            <h1>Canjeo de cupones</h1>
                            <p>Fecha: {`${new Date().getDate()}/${(new Date().getMonth()) + 1}/${new Date().getFullYear()}`}</p>
                        </div>
                        <div>
                            <h1>Ecomonedas disponibles</h1>
                            <p style={{ textAlign: 'right' }}>{dataUser.disponible}</p>

                            <h1>Ecomonedas requeridas</h1>
                            <p style={{ textAlign: 'right' }}>{ecomonedasRequeridas}</p>
                        </div>
                    </div>
                    <div className="infoCliente" style={{ marginTop: '20px' }}>
                        <div style={{ textAlign: 'right' }}>
                            <h1 style={{ textAlign: 'left' }}>Facturado a:</h1>
                            <p style={{ textAlign: 'left' }}>Nombre: {dataUser.NombreCompleto}</p>
                            <p style={{ textAlign: 'left' }}>Correo: {dataUser.Correo}</p>
                        </div>
                        <br />
                        <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
                            <Grid item xs={12}  >
                                <Typography variant='h6' gutterBottom>
                                    Cupones
                                    <Tooltip title='Agregar Cupones'>
                                        <span>
                                            <IconButton color='secondary' onClick={addNewCupon}>
                                                <AddIcon />
                                            </IconButton>
                                        </span>
                                    </Tooltip>
                                </Typography>
                                <FormControl className="cupones" variant='standard'>
                                    {loadedCupon &&
                                        fields.map((field, index) => (
                                            <div key={index}>
                                                <CuponesForm
                                                    name='cupones'
                                                    field={field}
                                                    data={dataCupon}
                                                    key={field.id}
                                                    index={index}
                                                    onRemove={removeCupon}
                                                    control={control}
                                                    onInputChange={handleInputChange}
                                                    disableRemoveButton={fields.length === 1}
                                                    onSelection={() => {
                                                        actualizarTotal()
                                                    }}
                                                    onChange={(e) => {
                                                        setValue('cupones', e.target.value, {
                                                            shouldValidate: true,
                                                        })
                                                    }
                                                    }
                                                />
                                                {errors.cupones && (
                                                    <FormHelperText
                                                        component={'span'}
                                                        sx={{ color: '#d32f2f' }}
                                                    >
                                                        <Grid
                                                            container
                                                            rowSpacing={1}
                                                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                                        >
                                                            {errors?.cupones[index]?.cupon_id && (
                                                                <Grid item xs={6}>
                                                                    {errors?.cupones[index]?.cupon_id
                                                                        ? errors?.cupones[index]?.cupon_id?.message
                                                                        : ' '}
                                                                </Grid>
                                                            )}
                                                            {errors?.cupones[index]?.cantidad && (
                                                                <Grid item xs={6}>
                                                                    {errors?.cupones[index]?.cantidad
                                                                        ? errors?.cupones[index]?.cantidad?.message
                                                                        : ' '}
                                                                </Grid>
                                                            )}

                                                        </Grid>
                                                    </FormHelperText>
                                                )}
                                            </div>
                                        ))}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Button
                                    type='submit'
                                    variant='contained'
                                    color='secondary'
                                    sx={{ m: 1 }}
                                >
                                    Canjear
                                </Button>
                            </Grid>
                        </form>
                        <div id="table-container">
                            <h1>Detalles del canjeo</h1>
                            <table border="1" cellPadding="8" style={{marginTop:'10px'}}>
                                <thead id="table-head">
                                    <tr>
                                        <th>Cupón</th>
                                        <th>Cantidad</th>
                                        <th>Precio</th>
                                        <th>SubTotal</th>
                                    </tr>
                                </thead>
                                <tbody id="table-body">
                                </tbody>
                            </table>
                        </div>
                        <Grid item xs={12} sm={4} className="containerTotal">
                            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                                <Controller
                                    name='total'
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            id='total'
                                            label='Total'
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                    </div>
                </section>
            </section>
        </>
    )
}