// eslint-disable-next-line no-unused-vars
import * as React from 'react'
import { useState, useContext } from 'react'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useForm, Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
// eslint-disable-next-line no-unused-vars
import { useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { UserContext } from '../../context/UserContext'
import toast from 'react-hot-toast'
import UsuarioService from '../../services/UsuarioService'

export function Login() {
  const navigate = useNavigate()
  const { saveUser } = useContext(UserContext) //aqui es donde llega el usuario los datos 
  // Esquema de validación
  const loginSchema = yup.object({
    email: yup.string()
      .required('El email es requerido')
      .email('Formato email'),
    password: yup.string()
      .required('El password es requerido')
  })
  const { control, handleSubmit, formState: { errors } } =
    useForm({
      // Valores iniciales
      defaultValues: {
        email: '',
        password: ''
      },
      // Asignación de validaciones
      resolver: yupResolver(loginSchema)
    })

  // Valores de formulario

  const [error, setError] = useState('');
  // Accion submit
  const onSubmit = (DataForm) => {
    try {

      UsuarioService.loginUser(DataForm)
        .then(response => {
          console.log(response)
          if (
            response.data.results != null &&
            response.data.results != undefined &&
            response.data.results != 'Usuario no valido'

          ) {
            //si se cumple el usuario es correcto
            saveUser(response.data.results)
            toast.success('Bienvenido,',{
              duration: 4000,
              position: 'top-center'
            })
            return navigate('/')
          } else {
            //usuario no es valido
            toast.error('Usuario no valido,',{
              duration: 4000,
              position: 'top-center'
            })
          }

        })
        .catch(error => {
          if (error instanceof SyntaxError) {
            console.log(error)
            setError(error)
            throw new Error('Respuesta no válida del servidor')
          }
        });

    } catch (e) {
      // handle your error
    }
  }

  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e)

  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant='h5' gutterBottom>
              Login
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='email'
                    label='Email'
                    error={Boolean(errors.email)}
                    helperText={errors.email ? errors.email.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='password'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='password'
                    label='Contraseña'
                    type='password'
                    error={Boolean(errors.password)}
                    helperText={errors.password ? errors.password.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button type='submit' variant='contained' color='secondary' sx={{ m: 1 }}>Login</Button>
          </Grid>
        </Grid>
      </form>
    </>
  )
}
