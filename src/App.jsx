import './App.css';
import { Layout } from './components/layout/Layout';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import { Home } from './components/layout/Home/home';
import { ListMateriales } from './components/Material/Material';
import { Materialdetalle } from './components/Material/detalle';
//import { PageNotFound } from './components/layout/Home/PageNotFound';
import { CentrosDeAcopio } from './components/centroAcopio/centroAcopio';
import { DetalleCentroAcopio } from './components/centroAcopio/detalleCentroAcopio';
import { Historial } from './components/Historial/historial';
import { HistorialMaterial } from './components/Historial/historialMaterial';
import { DetalleHistorialMaterial } from './components/Historial/detalleHistorialMaterial';
import { HistorialCanjeosAcopio } from './components/Historial/admin/HistorialCanjeosAcopio';
import CuponImagen from "../src/assets/images/cupones.avif";
import material from "../src/assets/images/historialMateriales.avif";
import centroAcopio from "../src/assets/images/centroAcopioCanjeos.png";
import MantenimientoMaterial from './components/Mantenimiento/MantenmientoMaterial/TableMaterial';
import { UpdateMaterial } from './components/Mantenimiento/MantenmientoMaterial/UpdateMaterial';
import { CreateMaterial } from './components/Mantenimiento/MantenmientoMaterial/CreateMaterial';
import MantenimientoCentro from './components/Mantenimiento/MantenimientoCentroAcopio/tablaCentro';
import { CreateCentro } from './components/Mantenimiento/MantenimientoCentroAcopio/CrearCentro';
import { UpdateCentro } from './components/Mantenimiento/MantenimientoCentroAcopio/UpdateCentro';
import { CanjeoMateriales } from './components/Proceso/canjeoMateriales/canjeoMateriales';
import UserProvider from './components/User/UserProvider';
import { Auth } from './components/User/Auth';
import { Login } from './components/User/Login';
import { Logout } from './components/User/Logout';
import { Signup } from './components/User/Signup';
import { Unauthorized } from './components/User/Unauthorized';
import { CambiarContrasena } from './components/User/CambiarContra';
import { Clientes } from './components/Admin/Clientes';
import MantenimientoAdminCentro from './components/Mantenimiento/MantenimientoAdminCentro/TableAdminCentro';
import { UpdateAdminCentro } from './components/Mantenimiento/MantenimientoAdminCentro/UpdateAdminCentro';
import TablaMonedas from './components/Proceso/Billetera/Monedas';
import {ReporteXAdmin} from './components/Reportes/reportesXAdminCentro';
import {ReporteXAdminAplicacion} from './components/Reportes/reportesAdmin';



export default function App() {
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
      path: '/Material',
      element: <ListMateriales />
    },
    {
      path: '/Materialdetalle/:id', 
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
      path: '/',
      element: <Auth allowedRoles={['Cliente']} />,
      children: [
        {
          path: '/HistorialCliente',
          element: (
            <>
              <div style={{ display: 'flex', width: '100%', paddingLeft: '300px' }}>
                <Historial imagen={material} url={'/HistorialMaterial'} titulo={"Historial de Canjes de Materiales"} /> {/* historial material cliente */}

                <Historial imagen={CuponImagen} url={'/HistorialMaterial'} titulo={"Historial de Canjes de cupones"} />  {/* historial cupones cliente */}
              </div>
            </>
          )
        },
        {
          path: '/HistorialMaterial',
          element: <HistorialMaterial />
        },
        {
          path: '/TablaMonedas',
          element: <TablaMonedas />
        }
      ]
    },
    {
      path: '/',
      element: <Auth allowedRoles={['Administrador centro acopio']} />,
      children: [
        {
          path: '/HistorialCentro',
          element: (
            <div style={{ display: 'flex', width: '100%', paddingLeft: '550px' }}>
              <Historial imagen={centroAcopio} url={'/HistorialMaterialCentro'} titulo={"Historial de Canjes del centro"} /> {/* historial material cliente */}
            </div>

          )
        },
        {
          path: '/HistorialMaterialCentro',
          element: <HistorialMaterial/>
        },
        {
          path: '/HistorialCanjeosAcopio',
          element: <HistorialCanjeosAcopio />
        },
        {
          path: '/CanjeoMateriales',
          element: <CanjeoMateriales />
        },
        {
          path: '/ReporteXAdmin',
          element: <ReporteXAdmin />
        }
      ]
    },
    {
      path: '/',
      element: <Auth allowedRoles={['Administrador centro acopio', 'Cliente']} />,
      children: [
        {
          path: '/DetalleHistorialMaterial/:id',
          element: <DetalleHistorialMaterial />
        }
      ]
    },
    {
      path: '/',
      element: <Auth allowedRoles={['Administrador centro acopio', 'Cliente', 'Administrador']} />,
      children: [
        {
          path: '/CambiarContraseña',
          element: <CambiarContrasena />
        }
      ]
    },
    {
      path: '/',
      element: <Auth allowedRoles={['Administrador']} />,
      children: [

        {
          path: '/MantenimientoMaterial',
          element: <MantenimientoMaterial />
        },
        {
          path: '/UpdateMaterial/:id',
          element: <UpdateMaterial />
        },
        {
          path: '/CreateMaterial',
          element: <CreateMaterial />
        },
        {
          path: '/MantenimientoCentro',
          element: <MantenimientoCentro />
        },
        {
          path: '/CreateCentro',
          element: <CreateCentro />
        },
        {
          path: '/UpdateCentro/:id',
          element: <UpdateCentro />
        },
        {
          path: '/Clientes',
          element: <Clientes />
        },
        {
          path: '/user/CreateAdminCentro',
          element: <Signup tipoUsuario={2} />
        },
        {
          path: '/MantenimientoAdminCentro',
          element: <MantenimientoAdminCentro />
        },
        {
          path: '/UpdateAdminCentro/:id',
          element: <UpdateAdminCentro />
        },
        {
          path: '/ReporteXAdminAplicacion',
          element: <ReporteXAdminAplicacion />
        },
      ]
    },
    /*  {
       path: '/HistorialCanjeosAcopio',
       element: <HistorialCanjeosAcopio idUsuario={userData.id} />
     }, */
    /* {
      path: '/MantenimientoMaterial',
      element: <MantenimientoMaterial />
    }, */
    /* {
      path: '/UpdateMaterial/:id',
      element: <UpdateMaterial />
    },
    {
      path: '/CreateMaterial',
      element: <CreateMaterial />
    }, */
    {
      path: '/user/login',
      element: <Login />
    },
    {
      path: '/user/logout',
      element: <Logout />
    },
    {
      path: '/user/CreateCliente',
      element: <Signup tipoUsuario={3} />
    },
    {
      path: '/unauthorized',
      element: <Unauthorized />
    },
  ])

  return (
    <UserProvider >
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </UserProvider>

  )
}