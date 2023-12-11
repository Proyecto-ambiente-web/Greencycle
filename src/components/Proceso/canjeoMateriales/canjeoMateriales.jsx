import { useContext, useEffect, useState } from "react";
import CentroAcopioServices from "../../../services/CentroAcopioServices";
import { Box, FormControl, Button, Grid, LinearProgress } from "@mui/material";
import { SelectCliente } from "../../Proceso/Form/SelectCliente";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import UsuarioService from "../../../services/UsuarioService";
import { FormHelperText } from '@mui/material';
import CanjeoService from "../../../services/CanjeoService";
import { MaterialForm } from '../Form/MaterialForm';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../../context/UserContext";


export function CanjeoMateriales() {
    const navigate = useNavigate();

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
        //Lista de centros del API
        CentroAcopioServices.getCentroAcopioXAdmin(userData.id)
            .then(response => {
                setData(response.data.results)
                setError(response.error)
                setLoaded(true)
                setValue('idCentro', response.data.results.id)
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
    }, [userData]);

    // Esquema de validación
    const CanjeoSchema = yup.object({
        NombreCompleto: yup.string()
            .required("Se requiere seleccionar un cliente"),
    });

    const {
        control,
        handleSubmit,
        setValue,
        //watch,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: {
            NombreCompleto: '',
            materiales: [
                {
                    material_id: '',
                    cantidad: '',
                    precio: '',
                    subTotal: ''
                },
            ],
            idCentro: '',
            total: 0
        },

        // Asignación de validaciones
        resolver: yupResolver(CanjeoSchema),
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'materiales',
    });


    // Si ocurre error al realizar el submit
    const onError = (errors, e) => console.log(errors, e);
    //Lista de usuarios clientes
    const [dataClientes, setdataClientes] = useState({});
    const [loadedClientes, setLoadedClientes] = useState(false);
    useEffect(() => {
        UsuarioService.usuariosClientes(3) //tipo del cliente
            .then((response) => {
                console.log(response);
                setdataClientes(response.data.results);
                setLoadedClientes(true);
            })
            .catch((error) => {
                if (error instanceof SyntaxError) {
                    console.log(error);
                    setError(error);
                    setLoadedClientes(false);
                    throw new Error('Respuesta no válida del servidor');
                }
            });
    }, []);


    //cliente seleccionado
    let [idCliente, setIdCliente] = useState(null);
    const [dataCliente, setdataCliente] = useState({});
    // const [loadedCliente, setLoadedCliente] = useState(false);
    useEffect(() => {
        UsuarioService.getUsuarioById(idCliente)
            .then((response) => {
                console.log(response);
                setdataCliente(response.data.results);
                //setLoadedCliente(true);
            })
            .catch((error) => {
                if (error instanceof SyntaxError) {
                    console.log(error);
                    setError(error);
                    //  setLoadedCliente(false);
                    throw new Error('Respuesta no válida del servidor');
                }
            });
    }, [idCliente]);

    const limpiarDetalle = () => {
        const cuerpoTabla = document.getElementById("table-body");
        cuerpoTabla.innerHTML = "";
    };

    const obtenerMaterial = (materialId) => {
        return dataMaterial.find((item) => item.id === materialId) || null;
    };

    const actualizarTotal = () => {
        const valores = getValues()
        let total = 0;
        let tabla = '';

        limpiarDetalle();
        valores.materiales.map((item) => {
            if (item.cantidad && item.cantidad != 0 && !isNaN(item.cantidad)) {
                const material = obtenerMaterial(item.material_id);
                const subTotal = parseInt(item.cantidad) * material.precio;

                tabla += `<tr>
                            <td>${material.descripcion}</td>
                            <td>${item.cantidad}</td>
                            <td>${material.precio}</td>
                            <td>${subTotal}</td>
                          </tr>`;

                total += subTotal;
            } else {
                return;
            }
        });

        document.getElementById("table-body").innerHTML += tabla;
        setValue('total', total)
    }

    const handleInputChange = (index, name, value) => {
        setValue(name, value)
        const valores = getValues()
        console.log(valores.materiales[index])
        let total = 0, tabla = '', material, subTotal = 0, indice = 0;

        limpiarDetalle();
        valores.materiales.map((item) => {
            material = obtenerMaterial(item.material_id);

            if (!item.cantidad || item.cantidad == 0) {
                limpiarDetalle();
                return;
            }

            if (isNaN(item.cantidad)) {
                toast.error("Debe ingresar una cantidad numérica", {
                    duration: 2000,
                    position: "top-center",
                });

                limpiarDetalle();
                return;
            }

            subTotal = parseInt(item.cantidad) * material.precio;

            tabla += `<tr>
                        <td style="text-align: left;">${material.descripcion}</td>
                        <td>${item.cantidad}</td>
                        <td>${material.precio}</td>
                        <td>${subTotal}</td>
                      </tr>`;

            total += subTotal;

            setValue(`materiales[${indice}].precio`, material.precio)
            setValue(`materiales[${indice}].subTotal`, subTotal)
            indice++;
        });

        document.getElementById("table-body").innerHTML += tabla;
        setValue('total', total)
    }

    const removeMaterial = (index) => {
        if (fields.length === 1) {
            return;
        }

        remove(index);
        actualizarTotal();
    };

    const addNewMaterial = () => {
        append({
            material_id: '',
            cantidad: '',
            precio: '',
            subTotal: ''
        });
    };

    const onSubmit = (DataForm) => {
        console.log('Formulario:');
        console.log(DataForm);
        let hasError = false;
        const materialIdSet = new Set();

        try {
            if (DataForm.materiales[0].material_id == "") {
                toast.error("Se requiere seleccionar mínimo un Material", {
                    duration: 4000,
                    position: 'top-center',
                });
                return;
            }

            DataForm.materiales.forEach((element) => {
                if (hasError) {
                    return;
                }

                if (materialIdSet.has(element.material_id)) { //materialIdSet es como un array donde pregunta por los id del material
                    toast.error("No se permiten Materiales duplicados", {
                        duration: 4000,
                        position: 'top-center',
                    });

                    hasError = true;
                }

                materialIdSet.add(element.material_id);

                if (element.cantidad == 0 || !element.cantidad) {
                    toast.error("Debe ingresar la cantidad del material", {
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

            if (CanjeoSchema.isValid()) {
                //Crear canjeo
                CanjeoService.crearCanjeo(DataForm)
                    .then((response) => {
                        console.log(response);
                        setError(response.error);
                        //Respuesta al usuario de creación
                        if (response.data.results != null) {
                            toast.success(response.data.results, {
                                duration: 4000,
                                position: 'top-center',
                            });

                            return navigate(`/DetalleHistorialMaterial/${response.data.canjeo.idCanjeo}`);
                        }
                    })
                    .catch((error) => {
                        if (error instanceof SyntaxError) {
                            console.log(error);
                            setError(error);
                            throw new Error('Respuesta no válida del servidor');
                        }
                    });
            }
        } catch (e) {
            //Capturar error
        }
    };

    console.log(data);
    //Lista de actores
    const [dataMaterial, setDataMaterial] = useState({});
    const [loadedMaterial, setLoadedMateriales] = useState(false);
    useEffect(() => {
        if (data && data.id) {
            CanjeoService.getMaterialesCentro(data.id)
                .then((response) => {
                    console.log(response);
                    setDataMaterial(response.data.results);
                    setLoadedMateriales(true);
                })
                .catch((error) => {
                    if (error instanceof SyntaxError) {
                        console.log(error);
                        setError(error);
                        setLoadedMateriales(false);
                        throw new Error('Respuesta no válida del servidor');
                    }
                });
        }
    }, [data]);

    if (!loaded) return (
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
                            <h1>Canjeo de materiales</h1>
                            <p>Fecha: {`${new Date().getDate()}/${(new Date().getMonth()) + 1}/${new Date().getFullYear()}`}</p>
                        </div>

                        <div>
                            <h1>Centro de acopio </h1>
                            <p>Nombre: {data.CentroAcopio}</p>
                            <p>Administrador: {data.NombreAdmin}</p>
                        </div>


                    </div>

                    <div className="infoCliente">
                        <div style={{ textAlign: 'right' }}>
                            <h1 style={{ textAlign: 'left' }}>Facturado a:</h1>
                            <p style={{ textAlign: 'left' }}>Nombre: {dataCliente.NombreCompleto}</p>
                            <p style={{ textAlign: 'left' }}>Correo: {dataCliente.Correo}</p>
                            <p style={{ textAlign: 'left' }}>identificación: {dataCliente.id}</p>
                        </div>
                        <br />
                        <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
                            <Grid item xs={12} sm={2} style={{ width: '40%' }}>
                                <FormControl variant='standard' fullWidth >
                                    {loadedClientes && (
                                        <Controller
                                            name='NombreCompleto'
                                            control={control}
                                            render={({ field }) => (
                                                <SelectCliente
                                                    field={field}
                                                    data={dataClientes}
                                                    error={Boolean(errors.NombreCompleto)}
                                                    onSelection={(value) => {
                                                        setValue('NombreCompleto', value, {
                                                            shouldValidate: true,
                                                        });
                                                        setIdCliente(value);
                                                        console.log(value)

                                                    }}
                                                    onChange={(e) => {
                                                        setValue('NombreCompleto', e.target.value, {
                                                            shouldValidate: true,
                                                        })
                                                        setIdCliente(e.target.value);
                                                    }}
                                                />
                                            )}
                                        />
                                    )}
                                    <FormHelperText sx={{ color: '#d32f2f' }}>
                                        {errors.NombreCompleto ? errors.NombreCompleto.message : ' '}
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                            {/**materiales */}
                            <Grid item xs={12}  >
                                <Typography variant='h6' gutterBottom>
                                    Materiales
                                    <Tooltip title='Agregar material'>
                                        <span>
                                            <IconButton color='secondary' onClick={addNewMaterial}>
                                                <AddIcon />
                                            </IconButton>
                                        </span>
                                    </Tooltip>
                                </Typography>

                                <FormControl className="materiales" variant='standard'>
                                    {/* Array de controles de actor */}
                                    {loadedMaterial &&
                                        fields.map((field, index) => (
                                            <div key={index}>
                                                <MaterialForm
                                                    name='materiales'
                                                    field={field}
                                                    data={dataMaterial}
                                                    key={field.id}
                                                    index={index}
                                                    onRemove={removeMaterial}
                                                    control={control}
                                                    onInputChange={handleInputChange}
                                                    disableRemoveButton={fields.length === 1}
                                                    onSelection={() => {
                                                        actualizarTotal()
                                                    }}
                                                    onChange={(e) => {
                                                        setValue('materiales', e.target.value, {
                                                            shouldValidate: true,
                                                        })
                                                    }
                                                    }

                                                />
                                                {errors.materiales && (
                                                    <FormHelperText
                                                        component={'span'}
                                                        sx={{ color: '#d32f2f' }}
                                                    >
                                                        <Grid
                                                            container
                                                            rowSpacing={1}
                                                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                                        >
                                                            {errors?.materiales[index]?.material_id && (
                                                                <Grid item xs={6}>
                                                                    {errors?.materiales[index]?.material_id
                                                                        ? errors?.materiales[index]?.material_id?.message
                                                                        : ' '}
                                                                </Grid>
                                                            )}
                                                            {errors?.materiales[index]?.cantidad && (
                                                                <Grid item xs={6}>
                                                                    {errors?.materiales[index]?.cantidad
                                                                        ? errors?.materiales[index]?.cantidad?.message
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
                                    Formalizar
                                </Button>
                            </Grid>
                        </form>

                        <div id="table-container">
                            <h1>Detalles del canjeo</h1>
                            <table border="1" cellPadding="8" style={{marginTop:'10px'}}>
                                    <thead id="table-head">
                                        <tr>
                                            <th>Material</th>
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