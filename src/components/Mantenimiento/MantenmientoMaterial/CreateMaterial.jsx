import { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import MaterialService from '../../../services/MaterialService';
import { toast } from 'react-hot-toast';
import { ChromePicker } from "react-color";
import { Popover } from "@mui/material";
import { Box, LinearProgress } from "@mui/material";
//https://www.npmjs.com/package/@hookform/resolvers

export function CreateMaterial() {
    const navigate = useNavigate();

    const [selectedColor, setSelectedColor] = useState("");//variable para el color

    const handleColorChange = (color) => {
        setSelectedColor(color.hex);
    };

    const [anchorEl, setAnchorEl] = useState(null);

    const handleButtonClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setValue('colorHexa', selectedColor);
    };

    const open = Boolean(anchorEl);

    const idPicker = open ? "color-picker-popover" : undefined;

    // Esquema de validación
    const materialSchema = yup.object({
        Nombre: yup
            .string()
            .required('El Nombre es requerido'),
        descripcion: yup.string().required('La descripcion es requerido'),
        precio: yup
            .number()
            .typeError('Solo acepta números')
            .required('El precio es requerido')
            .positive('Solo acepta números positivos'),
        unidadMedida: yup.string().required('La unidad de medida es requerida'),
        colorHexa: yup.string().required('El color es necesario')
    });

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            Nombre: '',
            descripcion: '',
            unidadMedida: '',
            precio: '',
            colorHexa: '',
        },
        // Asignación de validaciones
        resolver: yupResolver(materialSchema),
    });

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

    const [error, setError] = useState('');

    if (!loadedMateriales) return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>)
    if (error) return <p>Error: {error.message}</p>

    // Accion submit
    const onSubmit = (DataForm) => {
        console.log('Formulario:');
        console.log(DataForm);
        let bandera = true;

        try {

            {
                dataMateriales && dataMateriales.map((item) => {
                    if (item.colorHexa == DataForm.colorHexa) {
                        toast.error('Este color ya ha sido seleccionado', {
                            duration: 4000,
                            position: "top-center",
                        });

                        bandera = false;
                        return;
                    }
                })
            }

            if (bandera) {
                if (materialSchema.isValid()) {
                    //Crear material
                    MaterialService.crearMaterial(DataForm)
                        .then((response) => {
                            console.log(response);
                            setError(response.error);

                            //Respuesta al usuario de creación
                            if (response.data.results != null) {
                                toast.success(response.data.results, {
                                    duration: 4000,
                                    position: "top-center",
                                });
                                // Redireccion a la tabla
                                return navigate('/MantenimientoMaterial');
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
            }
        } catch (e) {
            //Capturar error
        }
    };
    // Si ocurre error al realizar el submit
    const onError = (errors, e) => console.log(errors, e);

    if (error) return <p>Error: {error.message}</p>;
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12}>
                        <Typography variant='h5' gutterBottom>
                            Crear material
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        {/* ['filled','outlined','standard']. */}
                        <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                            <Controller
                                name='Nombre'
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id='Nombre'
                                        label='Nombre del material'
                                        error={Boolean(errors.Nombre)}
                                        helperText={errors.Nombre ? errors.Nombre.message : ' '}
                                    />
                                )}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                            <Controller
                                name='descripcion'
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id='descripcion'
                                        label='Descripción del material'
                                        error={Boolean(errors.descripcion)}
                                        helperText={errors.descripcion ? errors.descripcion.message : ' '}
                                    />
                                )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        {/* ['filled','outlined','standard']. */}
                        <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                            <Controller
                                name='unidadMedida'
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id='unidadMedida'
                                        label='Unidad de medida'
                                        error={Boolean(errors.unidadMedida)}
                                        helperText={errors.unidadMedida ? errors.unidadMedida.message : ' '}
                                    />
                                )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                            <Controller
                                name='precio'
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id='precio'
                                        label='Precio del material'
                                        error={Boolean(errors.precio)}
                                        helperText={errors.precio ? errors.precio.message : ' '}
                                    />
                                )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                            <Controller
                                name="colorHexa"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id="colorHexa"
                                        label="Color del material en Hexadecimal"
                                        onClick={handleButtonClick}
                                        error={Boolean(errors.colorHexa)}
                                        value={selectedColor}             //agrega el color de la paleta de colores                        
                                        helperText={errors.colorHexa ? errors.colorHexa.message : ' '}
                                    />
                                )}
                            />
                            <Popover
                                id={idPicker}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                            >
                                <ChromePicker
                                    color={selectedColor}
                                    onChange={handleColorChange}
                                />
                            </Popover>
                        </FormControl>
                    </Grid>
                    {/* <Grid item xs={12} sm={4}>
                        <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                            <Controller
                                name="imagen"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id="imagen"
                                        label="Color del material "
                                        error={Boolean(errors.imagen)}
                                        helperText={errors.imagen ? errors.imagen.message : ' '}
                                    />
                                )}
                            />
                        </FormControl>
                    </Grid> */}
                    <Grid item xs={12} sm={12}>
                        <Button
                            type='submit'
                            variant='contained'
                            color='secondary'
                            sx={{ m: 1 }}
                        >
                            Crear
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}
