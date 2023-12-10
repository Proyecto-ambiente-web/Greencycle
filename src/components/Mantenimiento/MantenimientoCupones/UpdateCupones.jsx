import { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FormHelperText } from '@mui/material';
import { useForm, Controller, /* useFieldArray */ } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
//import TipoCuponServices from '../../../services/TipoCuponServices';
import { SelectTipoCupon } from './Form/SelectTipoCupon';
import CuponesServices from '../../../services/CuponesServices';
import TipoCuponServices from '../../../services/TipoCuponServices';
//https://www.npmjs.com/package/@hookform/resolvers

export function UpdateCupones() {
    const navigate = useNavigate();
    const routeParams = useParams();

    const id = routeParams.id || null;
    const [values, setValues] = useState(null);

    useEffect(() => {
        if (id != undefined && !isNaN(Number(id))) {
            CuponesServices.getCuponById(Number(id))
                .then((response) => { 
                    console.log(response);
                    setValues(response.data.results);
                    setError(response.error);
                })
                .catch((error) => {
                    if (error instanceof SyntaxError) {
                        console.log(error);
                        setError(error);

                        throw new Error("Respuesta no válida del servidor");
                    }
                });
        }
    }, [id]);

    // Esquema de validación
    const CentroAcopioSchema = yup.object({
        Nombre: yup.string().required("El nombre del centro es requerido"),
        descripcion: yup.string().required("La descripción es requerida"),
        idTipoCupon: yup.string().required("El tipo del cupón es requerido"),
        FechaFinal: yup.date()
            .required('La fecha es requerida')
            .min(new Date(), 'La fecha no puede ser anterior a la actual'),
        CantidadEcomonedas: yup.number().required("Se debe ingresar una cantidad de Ecomonedas")
            .positive("La cantidad de Ecomonedas debe ser un número positivo"),
    });

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            Nombre: "",
            descripcion: "",
            idTipoCupon: "",
            FechaInicio: "",
            FechaFinal: "",
            CantidadEcomonedas: 0,
        },
        //Valores a precargar en el formulario
        values,
        // Asignación de validaciones
        resolver: yupResolver(CentroAcopioSchema),
    });

     //Lista de tipos cupones
     const [dataTipoCupon, setdataTipoCupon] = useState({});
     const [loadedTipoCupon, setLoadedTipoCupon] = useState(false);
     useEffect(() => {
         TipoCuponServices.getTipoCupones()
             .then((response) => {
                 console.log(response);
                 setdataTipoCupon(response.data.results);
                 setLoadedTipoCupon(true);
             })
             .catch((error) => {
                 if (error instanceof SyntaxError) {
                     console.log(error);
                     setError(error);
                     setdataTipoCupon(false);
                     throw new Error("Respuesta no válida del servidor");
                 }
             });
     }, []);

    const [error, setError] = useState('');

    // Accion submit
    const onSubmit = (DataForm) => {
        console.log('Formulario:');
        console.log(DataForm);

        try {
            if (CentroAcopioSchema.isValid()) {
                //Crear pelicula
                CuponesServices.updateCupon(DataForm)
                    .then((response) => {
                        console.log(response);
                        setError(response.error);
                        //Respuesta al usuario de creación
                        if (response.data.results != null) {
                            toast.success(response.data.results, {
                                duration: 4000,
                                position: 'top-center',
                            });

                            // Redireccion a la tabla
                            return navigate('/TablaCupones');
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


    // Si ocurre error al realizar el submit
    const onError = (errors, e) => console.log(errors, e);



    if (error) return <p>Error: {error.message}</p>;
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12}>
                        <Typography variant="h5" gutterBottom>
                        Actualizar cupón
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        {/* ['filled','outlined','standard']. */}
                        <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                            <Controller
                                name="Nombre"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id="Nombre"
                                        label="Nombre del cupón"
                                        error={Boolean(errors.Nombre)}
                                        helperText={errors.Nombre ? errors.Nombre.message : " "}
                                    />
                                )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        {/* ['filled','outlined','standard']. */}
                        <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                            <Controller
                                name="descripcion"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id="descripcion"
                                        label="Descripción"
                                        error={Boolean(errors.descripcion)}
                                        helperText={
                                            errors.descripcion ? errors.descripcion.message : " "
                                        }
                                    />
                                )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                            {/* Lista de Provincia */}
                            {loadedTipoCupon && (
                                <Controller
                                    name="idTipoCupon"
                                    control={control}
                                    render={({ field }) => (
                                        <SelectTipoCupon
                                            field={field}
                                            data={dataTipoCupon}
                                            error={Boolean(errors.TipoCupon)}
                                            onChange={(e) =>
                                                setValue("idTipoCupon", e.target.value, {
                                                    shouldValidate: true,
                                                })
                                            }
                                        />
                                    )}
                                />
                            )}
                            <FormHelperText sx={{ color: "#d32f2f" }}>
                                {errors.Provincia ? errors.Provincia.message : " "}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} >
                        <FormControl
                            variant="standard"
                            fullWidth sx={{ m: 1 }}
                        >
                            <Controller
                                name="FechaInicio"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id="FechaInicio"
                                        type="date"
                                        label='Fecha inicial'
                                        InputProps={{
                                            shrink: true
                                        }}
                                        error={Boolean(errors.FechaInicio)}
                                        helperText={
                                            errors.FechaInicio ? errors.FechaInicio.message : " "
                                        }
                                    />
                                )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl
                            variant="standard"
                            fullWidth sx={{ m: 1 }}
                        >
                            <Controller
                                name="FechaFinal"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id="FechaFinal"
                                        type="date"
                                        label='Fecha final'
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        error={Boolean(errors.FechaFinal)}
                                        helperText={
                                            errors.FechaFinal ? errors.FechaFinal.message : " "
                                        }
                                    />
                                )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        {/* ['filled','outlined','standard']. */}
                        <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                            <Controller
                                name="CantidadEcomonedas"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id="CantidadEcomonedas"
                                        label="Cantidad de ecomonedas"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        error={Boolean(errors.CantidadEcomonedas)}
                                        helperText={
                                            errors.CantidadEcomonedas
                                                ? errors.CantidadEcomonedas.message
                                                : " "
                                        }
                                    />
                                )}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            sx={{ m: 1 }}
                        >
                            Actualizar cupón
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}