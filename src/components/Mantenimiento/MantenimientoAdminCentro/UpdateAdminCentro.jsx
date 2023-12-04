/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useForm, Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import UsuarioService from '../../../services/UsuarioService';
import ProvinciaService from '../../../services/ProvinciaService'
import CantonService from '../../../services/CantonService'
import { SelectProvincia } from '../../User/Form/SelectProvinciaUsuario'
import { SelectCanton } from '../../User/Form/SelectCantonUsuario'
import { FormHelperText } from '@mui/material';
import DistritoService from '../../../services/DistritoService.js'
import { SelectDistrito } from '../../User/Form/SelectDistritoUsuario'
import PropTypes from "prop-types";
import CentroAcopioServices from '../../../services/CentroAcopioServices.js'
import AdminCentro from '../../../services/AdminCentroService.js'
import AdminCentroService from '../../../services/AdminCentroService.js'

export function UpdateAdminCentro() {
  const navigate = useNavigate();
  const routeParams = useParams();

  const id = routeParams.id || null;

  const [values, setValores] = useState(null);

  useEffect(() => {
    if (id != undefined && !isNaN(Number(id))) {
      UsuarioService.getUsuarioById(Number(id))
            .then((response) => {
                setIdProvincia(response.data.results.idProvincia)
                setidCanton(response.data.results.idCanton)
                setValores('idProvincia', response.data.results.idProvincia)
                setValores('idCanton', response.data.results.idCanton)

                console.log(response);
                setValores(response.data.results);
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
    const updateAdminSchema = yup.object({
      NombreCompleto: yup.string()
        .required('El nombre es requerido'),
      Correo: yup.string()
        .required('El email es requerido')
        .email('Formato email'),
      Telefono: yup.string()
        .required('El teléfono es requerido'),
        idProvincia: yup.string().required("Se debe seleccionar una provincia"),
      idCanton: yup.string().required("Se debe seleccionar un cantón"),
      idDistrito: yup.string().required("Se debe seleccionar un distrito")
    })

    const {
      control,
      handleSubmit,
      setValue,
      formState: { errors },
     } = useForm({
        // Valores iniciales
        defaultValues: {
          NombreCompleto: '',
          Correo: '',
          Telefono: '',
          idProvincia: '',
          idCanton: '',
          idDistrito: ''
        },
        values,
        // Asignación de validaciones
        resolver: yupResolver(updateAdminSchema)
      })

      const [error, setError] = useState('');

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

  //Lista de canton
  const [dataDistrito, setDataDistrito] = useState({});
  const [loadedDistrito, setLoadedDistrito] = useState(false);
  let [idCanton, setidCanton] = useState(0);

  // Función para cargar cantones por id de provincia
  useEffect(() => {
    if (idCanton !== null) {
      DistritoService.getDistritoByCanton(idCanton)
        .then((response) => {
          console.log(response);
          setDataDistrito(response.data.results);
          setLoadedDistrito(true);
        })
        .catch((error) => {
          if (error instanceof SyntaxError) {
            console.log(error);
            setError(error);
            setLoadedDistrito(false);
            throw new Error('Respuesta no válida del servidor');
          }
        });
    }
  }, [idCanton]);

    const onSubmit = (DataForm) => {
      console.log('Formulario:');
      console.log(DataForm);

      try {
          if (updateAdminSchema.isValid()) {
            
            AdminCentroService.updateUsuario(DataForm)
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
                          return navigate('/MantenimientoAdminCentro');
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
                <Typography variant='h5' gutterBottom>
                  Actualizar administrador del centro de acopio
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                  <Controller
                    name='NombreCompleto'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id='NombreCompleto'
                        label='Nombre Completo'
                        error={Boolean(errors.NombreCompleto)}
                        helperText={errors.NombreCompleto ? errors.NombreCompleto.message : ' '}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                  <Controller
                    name='Correo'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id='Correo'
                        label='Email'
                        error={Boolean(errors.Correo)}
                        helperText={errors.Correo ? errors.Correo.message : ' '}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                  <Controller
                    name='Telefono'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id='Telefono'
                        label='Teléfono'
                        error={Boolean(errors.Telefono)}
                        helperText={errors.Telefono ? errors.Telefono.message : ' '}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                  {/* Lista de Provincia */}
                  {loadedProvincia && (
                    <Controller
                      name='idProvincia'
                      control={control}
                      render={({ field }) => (
                        <SelectProvincia
                          field={field}
                          data={dataProvincia}
                          error={Boolean(errors.idProvincia)}
                          onSelection={(value) => {
                            setValue('idProvincia', value, {
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
                    {errors.idProvincia ? errors.idProvincia.message : ' '}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                  {/* Lista de Provincia */}
                  {loadedCanton && (
                    <Controller
                      name='idCanton'
                      control={control}
                      render={({ field }) => (
                        <SelectCanton
                          field={field}
                          data={dataCanton}
                          error={Boolean(errors.idCanton)}
                          onSelection={(value) => {
                            setValue('idCanton', value, {
                              shouldValidate: true,
                            });
                            setidCanton(value);
                            console.log(value);
                          }}
                        />
                      )}
                    />
                  )}
                  <FormHelperText sx={{ color: '#d32f2f' }}>
                    {errors.idCanton ? errors.idCanton.message : ' '}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                  {/* Lista de Provincia */}
                  {loadedDistrito && (
                    <Controller
                      name='idDistrito'
                      control={control}
                      render={({ field }) => (
                        <SelectDistrito
                          field={field}
                          data={dataDistrito}
                          error={Boolean(errors.idDistrito)}
                          onChange={(e) =>
                            setValue('idDistrito', e.target.value, {
                              shouldValidate: true,
                            })
    
                          }
                        />
                      )}
                    />
                  )}
                  <FormHelperText sx={{ color: '#d32f2f' }}>
                    {errors.idDistrito ? errors.idDistrito.message : ' '}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button type='submit' variant='contained' color='secondary' sx={{ m: 1 }}>Actualizar</Button>
              </Grid>
            </Grid>
          </form>
        </>
      )
}
