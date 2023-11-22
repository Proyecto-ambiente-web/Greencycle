import { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import MaterialService from '../../../services/MaterialService';
import { Popover } from '@mui/material';
import { ChromePicker } from "react-color";
import { Box, LinearProgress } from "@mui/material";
//https://www.npmjs.com/package/@hookform/resolvers

export function UpdateMaterial() {
  const navigate = useNavigate();
  const routeParams = useParams();
  //Id de la material a actualizar
  const id = routeParams.id || null;
  //Valores a precargar en el formulario, vienen del API
  const [values, setValores] = useState(null);
  //Obtener la material del API

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

  useEffect(() => {
    if (id != undefined && !isNaN(Number(id))) {
      MaterialService.getMaterialById(Number(id))
        .then((response) => {
          console.log(response);
          setValores(response.data.results);
          setSelectedColor(response.data.results.colorHexa);
          setError(response.error);
        })
        .catch((error) => {
          if (error instanceof SyntaxError) {
            console.log(error);
            setError(error);

            throw new Error('Respuesta no válida del servidor');
          }
        });
    }
  }, [id]);

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
      imagen: '',
      unidadMedida: '',
      precio: '',
      colorHexa: ''
    },
    //Valores a precargar en el formulario
    values,
    // Asignación de validaciones
    resolver: yupResolver(materialSchema),
  });

  const [error, setError] = useState('');

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

  if (!loadedMateriales) return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>)
  if (error) return <p>Error: {error.message}</p>

  //Accion submit
  const onSubmit = (DataForm) => {
    console.log('Formulario:');
    console.log(DataForm);
    let bandera = true;

    try {
      {
        dataMateriales && dataMateriales.map((item) => {
          if (item.colorHexa == DataForm.colorHexa && item.id != DataForm.id) {
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
          MaterialService.updateMaterial(DataForm)
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
            <Typography variant="h5" gutterBottom>
              Actualizar Material
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="Nombre" // aqui es lo que sale en los campos de texto
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="Nombre"
                    label="Nombre de material"
                    error={Boolean(errors.Nombre)}
                    helperText={errors.Nombre ? errors.Nombre.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="descripcion"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="descripcion"
                    label="Descripcion"
                    error={Boolean(errors.descripcion)}
                    helperText={errors.descripcion ? errors.descripcion.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="unidadMedida"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="unidadMedida"
                    label="Unidad de medida"
                    error={Boolean(errors.unidadMedida)}
                    helperText={errors.unidadMedida ? errors.unidadMedida.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="precio"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="precio"
                    label="Precio"
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
                    label="Color del material"
                    onClick={handleButtonClick}
                    error={Boolean(errors.colorHexa)}
                    value={selectedColor}
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
          <Grid item xs={12} sm={12}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ m: 1 }}
            >
              Actualizar
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
