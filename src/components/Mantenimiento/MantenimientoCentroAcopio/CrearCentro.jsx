import { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FormHelperText, FormLabel, RadioGroup } from '@mui/material';
import { useForm, Controller, /* useFieldArray */ } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
//import IconButton from '@mui/material/IconButton';
//import AddIcon from '@mui/icons-material/Add';
//import Tooltip from '@mui/material/Tooltip';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import UsuarioService from '../../../services/UsuarioService.js';
import CantonService from '../../../services/CantonService.js';
import { toast } from 'react-hot-toast';
import { SelectProvincia } from './Form/SelectProvincia';
import { SelectCanton } from './Form/SelectCanton.jsx';
import CentroAcopioServices from '../../../services/CentroAcopioServices';
import MaterialService from '../../../services/MaterialService.js';
import ProvinciaService from '../../../services/ProvinciaService.js';
import { SelectAdmin } from './Form/SelectAdmin.jsx';
import { SelectMateriales } from './Form/SelectMateriales.jsx';
import * as React from 'react';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
//https://www.npmjs.com/package/@hookform/resolvers

export function CreateCentro() {
    const navigate = useNavigate();

    const [valor, setValor] = React.useState(1);

    const handleChange = (event) => {
        setValor(event.target.value);
        setValue('Estado', event.target.value)
    };

    const CentroAcopioSchema = yup.object({
        nombre: yup.string().required("El nombre del centro es requerido"),
        direccion: yup.string().required("La dirección es requerida"),
        telefono: yup.string().required("El teléfono es requerido"),
        horario: yup.string().required("El horario es requerido"),
        administrador: yup
            .string()
            .required("Se debe seleccionar una administrador para el centro"),
        Provincia: yup.string().required("Se debe seleccionar una provincia"),
        Canton: yup.string().required("Se debe seleccionar un cantón"),
        materiales: yup.array().min(1, "Se debe seleccionar mínimo un material"),
    });

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            nombre: "",
            Provincia: "",
            Canton: "",
            direccion: "",
            telefono: "",
            horario: "",
            administrador: "",
            materiales: [],
            Estado: 1,
        },
        // Asignación de validaciones
        resolver: yupResolver(CentroAcopioSchema),
    });

    const [error, setError] = useState('');

    // Accion submit
    const onSubmit = (DataForm) => {
        console.log('Formulario:');
        console.log(DataForm);

        try {
            if (CentroAcopioSchema.isValid()) {
                //Crear centro
                CentroAcopioServices.crearCentro(DataForm)
                    .then((response) => {
                        console.log(response);
                        setError(response.error);
                        //Respuesta al usuario de creación
                        //if (response.data.results != null) {
                        toast.success(response.data.results, {
                            duration: 4000,
                            position: 'top-center',
                        });
                        // Redireccion a la tabla
                        return navigate('/MantenimientoCentro');
                        //}
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

    // Si ocurre error al realizar el submit
    const onError = (errors, e) => console.log(errors, e);
    //Lista de provincia
    const [dataProvincia, setdataProvincia] = useState({});
    const [loadedProvincia, setLoadedProvincia] = useState(false);
    useEffect(() => {
        ProvinciaService.getProvincias()
            .then((response) => {
                console.log(response);
                setdataProvincia(response.data.results);
                setLoadedProvincia(true);
            })
            .catch((error) => {
                if (error instanceof SyntaxError) {
                    console.log(error);
                    setError(error);
                    setLoadedProvincia(false);
                    throw new Error('Respuesta no válida del servidor');
                }
            });
    }, []);


    //Lista de canton
    const [dataCanton, setDataCanton] = useState({});
    const [loadedCanton, setLoadedCanton] = useState(false);
    let [idProvincia, setIdProvincia] = useState(0);

    // Función para cargar cantones por id de provincia
    useEffect(() => {
        if (idProvincia !== null) {
            CantonService.getCantonByIdProvincia(idProvincia)
                .then((response) => {
                    console.log(response);
                    setDataCanton(response.data.results);
                    setLoadedCanton(true);
                })
                .catch((error) => {
                    if (error instanceof SyntaxError) {
                        console.log(error);
                        setError(error);
                        setLoadedCanton(false);
                        throw new Error('Respuesta no válida del servidor');
                    }
                });
        }
    }, [idProvincia]);



    //Lista de admins
    const [dataAdministrador, setDataAdministrador] = useState({});
    const [loadedAdministrador, setLoadedAdministrador] = useState(false);
    useEffect(() => {
        UsuarioService.getUsuarios() //aqui falta una consulta de solo los admins
            .then((response) => {
                console.log(response);
                setDataAdministrador(response.data.results);
                setLoadedAdministrador(true);
            })
            .catch((error) => {
                if (error instanceof SyntaxError) {
                    console.log(error);
                    setError(error);
                    setLoadedAdministrador(false);
                    throw new Error('Respuesta no válida del servidor');
                }
            });
    }, []);

    //Lista de materiales
    const [dataMateriales, setDataMateriales] = useState({});
    const [loadedMateriales, setLoadedMateriales] = useState(false);
    useEffect(() => {
        MaterialService.getMateriales()
            .then((response) => {
                console.log(response);
                setDataMateriales(response.data.results);
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
    }, []);

    if (error) return <p>Error: {error.message}</p>;
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12}>
                        <Typography variant='h5' gutterBottom>
                            Crear centro de acopio
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        {/* ['filled','outlined','standard']. */}
                        <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                            <Controller
                                name='nombre'
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id='nombre'
                                        label='Nombre del centro'
                                        error={Boolean(errors.nombre)}
                                        helperText={errors.nombre ? errors.nombre.message : ' '}
                                    />
                                )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        {/* ['filled','outlined','standard']. */}
                        <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                            <Controller
                                name='direccion'
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id='direccion'
                                        label='Dirección'
                                        error={Boolean(errors.direccion)}
                                        helperText={errors.direccion ? errors.direccion.message : ' '}
                                    />
                                )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                            <Controller
                                name='telefono'
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id='telefono'
                                        label='Teléfono del centro'
                                        error={Boolean(errors.telefono)}
                                        helperText={errors.telefono ? errors.telefono.message : ' '}
                                    />
                                )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        {/* ['filled','outlined','standard']. */}
                        <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                            <Controller
                                name='horario'
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id='horario'
                                        label='Horario del centro'
                                        error={Boolean(errors.horario)}
                                        helperText={errors.horario ? errors.horario.message : ' '}
                                    />
                                )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                            {/* Lista de Provincia */}
                            {loadedProvincia && (
                                <Controller
                                    name='Provincia'
                                    control={control}
                                    render={({ field }) => (
                                        <SelectProvincia
                                            field={field}
                                            data={dataProvincia}
                                            error={Boolean(errors.Provincia)}
                                            onSelection={(value) => {
                                                setValue('Provincia', value, {
                                                    shouldValidate: true,
                                                });
                                                setIdProvincia(value);
                                                console.log(value);
                                            }}

                                        />

                                    )}

                                />


                            )}
                            <FormHelperText sx={{ color: '#d32f2f' }}>
                                {errors.Provincia ? errors.Provincia.message : ' '}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                            {/* Lista de Provincia */}
                            {loadedCanton && (
                                <Controller
                                    name='Canton'
                                    control={control}
                                    render={({ field }) => (
                                        <SelectCanton
                                            field={field}
                                            data={dataCanton}
                                            error={Boolean(errors.Canton)}
                                            onChange={(e) =>
                                                setValue('Canton', e.target.value, {
                                                    shouldValidate: true,
                                                })

                                            }
                                        />
                                    )}
                                />
                            )}
                            <FormHelperText sx={{ color: '#d32f2f' }}>
                                {errors.Canton ? errors.Canton.message : ' '}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                            {/* Lista de Admin */}
                            {loadedAdministrador && (
                                <Controller
                                    name='administrador'
                                    control={control}
                                    render={({ field }) => (
                                        <SelectAdmin
                                            field={field}
                                            data={dataAdministrador}
                                            error={Boolean(errors.administrador)}
                                            onChange={(e) =>
                                                setValue('administrador', e.target.value, {
                                                    shouldValidate: true,
                                                })
                                            }
                                        />
                                    )}
                                />
                            )}
                            <FormHelperText sx={{ color: '#d32f2f' }}>
                                {errors.administrador ? errors.administrador.message : ' '}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                            {/* Lista de materiales */}
                            {loadedMateriales && (
                                <Controller
                                    name='materiales'
                                    control={control}
                                    render={({ field }) => (
                                        <SelectMateriales
                                            field={field}
                                            data={dataMateriales}
                                            error={Boolean(errors.materiales)}
                                            onChange={(e) =>
                                                setValue('materiales', e.target.value, {
                                                    shouldValidate: true,
                                                })
                                            }
                                        />
                                    )}
                                />
                            )}
                            <FormHelperText sx={{ color: '#d32f2f' }}>
                                {errors.materiales ? errors.materiales.message : ' '}
                            </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={4} style={{ paddingLeft: "5%" }}>
                        <FormControl>
                            <FormLabel id="demo-controlled-radio-buttons-group">Estado</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="Estado"
                                value={valor}
                                onChange={handleChange}
                            >
                                <FormControlLabel value={1} control={<Radio />} label="Activado" />
                                <FormControlLabel value={0} control={<Radio />} label="Desactivado" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <Button
                            type='submit'
                            variant='contained'
                            color='secondary'
                            sx={{ m: 1 }}
                        >
                            Crear centro
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}
