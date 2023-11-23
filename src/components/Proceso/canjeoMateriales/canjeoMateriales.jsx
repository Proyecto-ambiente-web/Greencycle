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
            .required("Se requiere seleccionar una provincia"),
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
                    precio: 0
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

    const handleInputChange = (index, name, value) => {
        setValue(name, value)
        const valores = getValues()
        console.log(valores.materiales[index])
        let total = 0;

        valores.materiales.map((item) => {
            total += parseInt(item.cantidad) * parseInt(item.precio);
        })
        setValue('total', total)
    }

    // useFieldArray:
    // relaciones de muchos a muchos, con más campos además
    // de las llaves primaras



    const removeMaterial = (index) => {
        if (fields.length === 1) {
            return;
        }
        remove(index);
    };

    const addNewMaterial = () => {
        append({
            material_id: '',
            cantidad: '',
            precio: 0
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
                    <div style={{ textAlign: 'left' }}>
                        <h1>Canjeo de materiales</h1>
                        <p>Fecha: {`${new Date().getDate()}/${(new Date().getMonth()) + 1}/${new Date().getFullYear()}`}</p>
                        <br />
                        <h1>Cetro de acopio </h1>
                        <p>Nombre: {data.CentroAcopio}</p>
                        <p>Administrador: {data.NombreAdmin}</p>

                    </div>

                    <div style={{ width: '200px' }}>
                        <div style={{ textAlign: 'right' }}>
                            <h1 style={{ textAlign: 'left' }}>Facturado a:</h1>
                            <p style={{ textAlign: 'left' }}>Nombre: {dataCliente.NombreCompleto}</p>
                            <p style={{ textAlign: 'left' }}>Correo: {dataCliente.Correo}</p>
                            <p style={{ textAlign: 'left' }}>identificación: {dataCliente.id}</p>
                        </div>

                        <form onSubmit={handleSubmit(onsubmit, onError)} noValidate>
                            <Grid item xs={12} sm={2} style={{ width: '80%' }}>
                                <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
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

                            <Grid item xs={12} sm={6}>
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
                                <FormControl className="materiales" variant='standard' fullWidth sx={{ m: 1 }}>
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
                            <Grid item xs={12} sm={4}>
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
                    </div>
                </section>
            </section>

        </>
    )
}