import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useForm, Controller /* useFieldArray */ } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
//import IconButton from '@mui/material/IconButton';
//import AddIcon from '@mui/icons-material/Add';
//import Tooltip from '@mui/material/Tooltip';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import TipoCuponServices from "../../../services/TipoCuponServices.js";
import { SelectTipoCupon } from "../MantenimientoCupones/Form/SelectTipoCupon.jsx";
import { FormHelperText } from "@mui/material";
import CuponesServices from "../../../services/CuponesServices.js";

//https://www.npmjs.com/package/@hookform/resolvers

export function CreateCupones() {
    const navigate = useNavigate();

    const obtenerFechaActual = () => {
         const fecha = new Date();
         const formatoFecha = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}-${fecha.getDate().toString().padStart(2, '0')}`;
         return formatoFecha;
    };

    const CentroAcopioSchema = yup.object({
        Nombre: yup.string().required("El nombre del centro es requerido"),
        descripcion: yup.string().required("La descripción es requerida"),
        TipoCupon: yup.string().required("El tipo del cupón es requerido"),
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
            TipoCupon: "",
            FechaInicio: '',
            FechaFinal: "",
            CantidadEcomonedas: 0,
        },
        // Asignación de validaciones
        resolver: yupResolver(CentroAcopioSchema),
    });

    const [error, setError] = useState("");

    //Fija la fecha actual
    useEffect(() => {
        setValue('FechaInicio', obtenerFechaActual());
      }, [setValue]);

    const onSubmit = (DataForm) => {
        console.log("Formulario:");
        console.log(DataForm);
        try {
            if (CentroAcopioSchema.isValid()) {
                //Crear centro
                const fechaFinalFormateada = new Date(DataForm.FechaFinal).toISOString().split('T')[0];     
                
                CuponesServices.crearCupon({ ...DataForm, FechaFinal: fechaFinalFormateada })
                    .then((response) => {
                        console.log(response);
                        setError(response.error);
                        //Respuesta al usuario de creación
                        //if (response.data.results != null) {
                        toast.success(response.data.results, {
                            duration: 4000,
                            position: "top-center",
                        });
                        // Redireccion a la tabla
                        return navigate("/TablaCupones");
                        //}
                    })
                    .catch((error) => {
                        if (error instanceof SyntaxError) {
                            console.log(error);
                            setError(error);
                            throw new Error("Respuesta no válida del servidor");
                        }
                    });
            }
        } catch (e) {
            //Capturar error
        }
    };

    // Si ocurre error al realizar el submit
    const onError = (errors, e) => console.log(errors, e);

    //Lista de cupones
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

    if (error) return <p>Error: {error.message}</p>;
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12}>
                        <Typography variant="h5" gutterBottom>
                            Crear cupon
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
                                    name="TipoCupon"
                                    control={control}
                                    render={({ field }) => (
                                        <SelectTipoCupon
                                            field={field}
                                            data={dataTipoCupon}
                                            error={Boolean(errors.TipoCupon)}
                                            onChange={(e) =>
                                                setValue("TipoCupon", e.target.value, {
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
                                            readOnly: true,
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
                            Crear cupón
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}
