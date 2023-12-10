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
  const [dataTotalcentro, setDataTotalcentro] = useState(null);
  const [dataTotalCanjesDelMes, setDataTotalCanjesDelMes] = useState(null);
  const [dataEstadisticaMonedas, setDataEstadisticaMonedas] = useState(null);

  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  const { user, decodeToken } = useContext(UserContext)
  const [userData, setUserData] = useState(decodeToken())

  useEffect(() => {
    setUserData(decodeToken())
  }, [user])

  useEffect(() => {
    ReportesServcies.getTotalMonedasXCentro(userData.id)
      .then((response) => {
        //Retorna Genero - Cantidad
        const dataGraph = response.data.results;
        const formatData = dataGraph.map((item) => ({
          Cantidad: parseInt(item.TotalEcoMonedaGenerada),
          nombre: item.nombre
        }));
        setDataTotalcentro(formatData);
        setLoaded(true);
      })
      .catch((error) => {
        setDataTotalcentro(null);
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoaded(false);
          throw new Error('Respuesta no válida del servidor');
        }
      });
  }, [userData.id]);

  useEffect(() => {
    ReportesServcies.getCantTotalCanjesDelMes(userData.id)
      .then((response) => {
        //Retorna Genero - Cantidad
        const dataGraph = response.data.results;
        const formatData = dataGraph.map((item) => ({
          Mes: `Mes: ${new Date().getMonth() + 1}`,
          Cantidad: parseInt(item.CantidadCanjeMateriales),
        }));
        setDataTotalCanjesDelMes(formatData);
        setLoaded(true);
      })
      .catch((error) => {
        setDataTotalCanjesDelMes(null);
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoaded(false);
          throw new Error('Respuesta no válida del servidor');
        }
      });
  }, [userData.id]);

  useEffect(() => {
    ReportesServcies.getEstadisticaMonedasXcentroAnnioActual(userData.id)
      .then((response) => {
        //Retorna Genero - Cantidad
        const dataGraph = response.data.results;
        const formatData = dataGraph.map((item) => ({
          Centro: item.nombre,
          TotalCanjeMateriales: parseInt(item.TotalCanjeMateriales),
          SumaTotalEcoMoneda: parseInt(item.SumaTotalEcoMoneda),
          PromedioEcoMoneda: parseInt(item.PromedioEcoMoneda),
          MaxEcoMoneda: parseInt(item.MaxEcoMoneda),
          MinEcoMoneda: parseInt(item.MinEcoMoneda),
        }));
        setDataEstadisticaMonedas(formatData);
        setLoaded(true);
      })
      .catch((error) => {
        setDataEstadisticaMonedas(null);
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
      {dataTotalcentro && (
        <>
          <ResponsiveContainer width="100%" height={500} key={2} style={{ marginTop: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>Sumatoria de eco-monedas generadas por cada centro</h2>
            <PieChart width={730} height={250}>
              <Pie
                data={dataTotalcentro}
                dataKey="Cantidad"
                nameKey="nombre"
                cx="50%"
                cy="50%"
                fill="#8884d8"
                //Etiqueta nombre: valor
                label={({ name, value }) => `${name} - Generado: ${value}`}
              >
                {/* Colores del gráfico */}
                {dataTotalcentro.map((entry, index) => (
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
      {dataTotalCanjesDelMes && (
        <>
          <h2 style={{ textAlign: 'center', margin: '90px 0 20px' }}>Total de canjes de materiales registrados en el mes actual</h2>
          <ResponsiveContainer width="100%" height={500} key={1}>
            <BarChart data={dataTotalCanjesDelMes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="Cantidad"
                fill="#82ca9d"
                stroke="#000000"
                strokeWidth={1}
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
      {dataEstadisticaMonedas && (
        <>
          <h2 style={{ textAlign: 'center', margin: '90px 0 20px' }}>
            Estadística de eco-monedas producidas por cada centro en el año actual
          </h2>
          <ResponsiveContainer width="100%" height={500} key={1} style={{ marginBottom: '50px' }}>
            <BarChart data={dataEstadisticaMonedas}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Centro" />
              <YAxis />
              <Tooltip />
              <Legend />
              {['TotalCanjeMateriales', 'SumaTotalEcoMoneda', 'PromedioEcoMoneda', 'MaxEcoMoneda', 'MinEcoMoneda'].map(
                (dataKey, index) => (
                  <Bar
                    key={index}
                    dataKey={dataKey}
                    stackId="a"
                    fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // color aleatorio
                    barSize={30}
                  />
                )
              )}
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </>
  );
}
