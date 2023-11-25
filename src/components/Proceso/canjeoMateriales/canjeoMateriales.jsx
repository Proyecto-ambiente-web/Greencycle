import { useEffect, useState } from "react";
import CentroAcopioServices from "../../../services/CentroAcopioServices";
import { Box, FormControl, Grid, LinearProgress } from "@mui/material";
import PropTypes from "prop-types";
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

CanjeoMateriales.propTypes = { idUsuario: PropTypes.string.isRequired };


export function CanjeoMateriales({ idUsuario }) {
    const [data, setData] = useState(null);
    //Error del API
    const [error, setError] = useState("");
    //Booleano para establecer sí se ha recibido respuesta
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        //Lista de peliculas del API
        CentroAcopioServices.getCentroAcopioXAdmin(idUsuario)
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

    // Esquema de validación
    const CanjeoSchema = yup.object({
        NombreCompleto: yup.mixed()
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
    //Lista de provincia
    const [dataClientes, setdataClientes] = useState({});
    const [loadedClientes, setLoadedClientes] = useState(false);
    useEffect(() => {
        UsuarioService.usuariosClientes(3)
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

    /*  const watchActores=watch('actors')*/
    const limpiarDetalle = () => {
        const cuerpoTabla = document.getElementById("table-body");
        cuerpoTabla.innerHTML = "";
    };

    const obtenerMaterial = (materialId) => {
        return dataMaterial.find((item) => item.id === materialId) || null;
    };

    const verificarTotales = () => {
        const valores = getValues()
        let total = 0;
        let tabla = '';

        limpiarDetalle();
        valores.materiales.map((item) => {
            const material = obtenerMaterial(item.material_id);
            const subTotal = parseInt(item.cantidad) * material.precio;
            tabla += `<tr>
                        <td>${material.descripcion}</td>
                        <td>${item.cantidad}</td>
                        <td>${material.precio}</td>
                        <td>${subTotal}</td>
                      </tr>`;

            total += subTotal;
        });

        document.getElementById("table-body").innerHTML += tabla;
        setValue('total', total)
    }

    const handleInputChange = (index, name, value) => {
        setValue(name, value)
        const valores = getValues()
        console.log(valores.materiales[index])
        let total = 0;
        let tabla = '';

        limpiarDetalle();
        valores.materiales.map((item) => {
            const material = obtenerMaterial(item.material_id);

            if (isNaN(item.cantidad)) {
                toast.error("Debe ingresar una cantidad numérica", {
                    duration: 4000,
                    position: "top-center",
                });

                limpiarDetalle();
                return;
            }

            if (!item.cantidad || item.cantidad == 0) {
                limpiarDetalle();
                return;
            }

              // setValue(`materiales[${index}].subTotal`, subTotal)   ---> Fija subtotal en el UseForm
              /* Debe actualizar los datos al quitar un material */
               /* Debe validar que no seleccione el mismo material */
            const subTotal = parseInt(item.cantidad) * material.precio;
            tabla += `<tr>
                        <td>${material.descripcion}</td>
                        <td>${item.cantidad}</td>
                        <td>${material.precio}</td>
                        <td>${subTotal}</td>
                      </tr>`;

            total += subTotal;
        });

        document.getElementById("table-body").innerHTML += tabla;
        setValue('total', total)
    }

    const removeMaterial = (index) => {
        if (fields.length === 1) {
            return;
        }

        remove(index);
        verificarTotales();
    };

    const addNewMaterial = () => {
        append({
            material_id: '',
            cantidad: '',
            precio: '',
            subTotal: ''
        });
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
                            <h1>Cetro de acopio </h1>
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
                        <form onSubmit={handleSubmit(onsubmit, onError)} noValidate>
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
                                        {errors.cliente ? errors.cliente.message : ' '}
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
                                                    onChange={(e) =>
                                                        setValue('materiales', e.target.value, {
                                                            shouldValidate: true,
                                                        })

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
                            <Grid item xs={12} sm={4} style={{ width: "50%" }}>
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
                        </form>
                        <div id="table-container">
                            <h1>Detalles del canjeo</h1>
                            <table >
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
                    </div>
                </section>
            </section>

        </>
    )
}