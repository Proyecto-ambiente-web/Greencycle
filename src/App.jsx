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
import { HistorialMaterial } from './components/Historial/historialMaterial';

{/*se necesita el mismo nombre de la función para el import */}
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
    path:'/mantenimientoMaterial',
    element: <ListMateriales />
  },
  {
    path:'/Materialdetalle/:id', // se agrega el id porque ingresa desde otra ubicación en props
    element: <Materialdetalle/>
  },
  {
    path:'/CentrosDeAcopio',
    element: <CentrosDeAcopio />
  },
  {
    path:'/DetalleCentroAcopio/:id',
    element: <DetalleCentroAcopio />
  },
  {
    path:'/HistorialMaterial/:id',
    element: <HistorialMaterial />
  }
])

export default function App() {
  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  )
}