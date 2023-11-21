import { useEffect, useState } from "react";
import CentroAcopioServices from "../../../services/CentroAcopioServices";
import { Box, FormControl, Grid, LinearProgress } from "@mui/material";
import PropTypes from "prop-types";
import { SelectCliente } from "../../Proceso/Form/SelectCliente";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import UsuarioService from "../../../services/UsuarioService";
import { FormHelperText } from '@mui/material';

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
        formState: { errors },
    } = useForm({
        defaultValues: {
            NombreCompleto: '',
        },

        // Asignación de validaciones
        resolver: yupResolver(CanjeoSchema),
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

                    <div style={{ textAlign: 'right' }}>
                        <h1>Facturado a:</h1>
                        <p style={{ textAlign: 'left' }}>Nombre { }</p>
                        <p style={{ textAlign: 'left' }}>Correo { }</p>
                        <p style={{ textAlign: 'left' }}>identificación { }</p>

                        <br />
                        <form onSubmit={handleSubmit(onsubmit, onError)} noValidate>
                           
                            <Grid item xs={12} sm={2} style={{ width: '300px' }}>
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
                                                    onChange={(e) => {
                                                        setValue('NombreCompleto', e.target.value, {
                                                            shouldValidate: true,
                                                        })

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
                        </form>
                    </div>
                </section>

            </section>
        </>
    )
}