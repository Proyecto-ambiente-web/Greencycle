import { useContext, useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
  PieChart,
  Pie,
} from 'recharts';
import { UserContext } from '../../context/UserContext';
import ReportesServcies from '../../services/ReportesServcies';

export function ReporteXAdminAplicacion() {
  //https://recharts.org/en-US/guide
  const [data, setData] = useState(null);

  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  const { user, decodeToken } = useContext(UserContext)
    const [userData, setUserData] = useState(decodeToken())

    useEffect(() => {
        setUserData(decodeToken())
    }, [user])

  useEffect(() => {
    ReportesServcies.getTotalCanjesMesActual(userData.id)
      .then((response) => {
        //Retorna Genero - Cantidad
        const dataGraph = response.data.results;
        const formatData = dataGraph.map((item) => ({
            Mes: `Mes: ${new Date().getMonth() + 1}`,
            Cantidad: parseInt(item.TotalEcoMonedaGenerada),
            nombre: item.nombre
        }));
        setData(formatData);
        setLoaded(true);
      })
      .catch((error) => {
        setData(null);
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoaded(false);
          throw new Error('Respuesta no válida del servidor');
        }
      });
  }, [userData.id]);
  const COLORS = [
    '#65d3da',
    '#79d69f',
    '#fad144',
    '#d76c6c',
    '#138185',
    '#26a0a7',
    '#ec983d',
    '#cbe989',
    '#f9ec86',
    '#ebf898',
  ];
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      {!loaded && <div>Cargando...</div>}
      {data && (
        <>    
          <ResponsiveContainer width="100%" height={500} key={2}>
            <PieChart width={730} height={250}>
              <Pie
                data={data}
                dataKey="Cantidad"
                nameKey="nombre"
                cx="50%"
                cy="50%"
                fill="#8884d8"
                //Etiqueta nombre: valor
                label={({ name, value }) => `${name} ${value}`}
              > 
              {/* Colores del gráfico */}
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                /> 
              ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </>
      )}
    </>
  );
}
