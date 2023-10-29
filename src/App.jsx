import './App.css'
import { Layout } from './components/layout/Layout';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import { Home } from './components/layout/Home/home';
import { ListMateriales } from './components/manteMaterial/MantenimientoMaterial';
import { Materialdetalle } from './components/manteMaterial/detalle';//hijo 
//import { PageNotFound } from './components/layout/Home/PageNotFound';
import { CentrosDeAcopio } from './components/centroAcopio/centroAcopio';
import { DetalleCentroAcopio } from './components/centroAcopio/detalleCentroAcopio';
import { Historial } from './components/Historial/historial';
import { HistorialMaterial } from './components/Historial/historialMaterial';
import { DetalleHistorialMaterial } from './components/Historial/detalleHistorialMaterial';

import { useState } from 'react';
import { Grid } from '@mui/material';
import CuponImagen from "../src/assets/images/cupones.avif";
import material from "../src/assets/images/historialMateriales.avif";


{/*se necesita el mismo nombre de la función para el import */ }

export default function App() {
  const [idUsuario, setIdUsuario] = useState(null);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    /* {
       path:'*',
       element: <PageNotFound />
     }, */
    {
      path: '/mantenimientoMaterial',
      element: <ListMateriales />
    },
    {
      path: '/Materialdetalle/:id', // se agrega el id porque ingresa desde otra ubicación en props
      element: <Materialdetalle />
    },
    {
      path: '/CentrosDeAcopio',
      element: <CentrosDeAcopio />
    },
    {
      path: '/DetalleCentroAcopio/:id',
      element: <DetalleCentroAcopio />
    },
    {
      path: '/Historial',
      element: (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3} style={{ display: "flex", justifyContent: "end" }} spacing={3}>
            <Historial  imagen={material}/>
            <Historial  imagen={CuponImagen}/>
          </Grid>
      ),
    },
    {
      path: '/HistorialMaterial',
      element: <HistorialMaterial idUsuario={idUsuario} />
    },
    {
      path: '/DetalleHistorialMaterial',
      element: <DetalleHistorialMaterial />
    },

  ])

  return (
    <Layout setIdUsuario={setIdUsuario}>
      <RouterProvider router={router} />
    </Layout>
  )
}