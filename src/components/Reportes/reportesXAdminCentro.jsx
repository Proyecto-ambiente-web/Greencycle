import { useEffect, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    // Cell,
    ResponsiveContainer,
    // PieChart,
    // Pie,
} from 'recharts';
import { useContext } from "react";
import { UserContext } from '../../context/UserContext';
import ReportesServcies from '../../services/ReportesServcies';

export function ReporteXAdmin() {
    const [dataCanjesMensuales, setDataCanjesMensuales] = useState(null);
    const [dataCanjesAnnio, setDataCanjesAnnio] = useState(null);
    const [dataTotalGenerado, setDataTotalGenerado] = useState(null);

    const [error, setError] = useState('');
    const [loaded, setLoaded] = useState(false);

    const { user, decodeToken } = useContext(UserContext)
    const [userData, setUserData] = useState(decodeToken())

    useEffect(() => {
        setUserData(decodeToken())
    }, [user])

    //Cantidad de canjes de materiales realizados en el mes actual
    useEffect(() => {
        ReportesServcies.getCantCanjesMesActual(userData.id)
            .then((response) => {
                const dataGraph = response.data.results;
                const formatData = dataGraph.map((item) => ({
                    Mes: `Mes: ${new Date().getMonth() + 1}`,
                    Cantidad: parseInt(item.CantidadCanjesMateriales),
                }));

                setDataCanjesMensuales(formatData);
                setLoaded(true);
            })
            .catch((error) => {
                setDataCanjesMensuales(null);
                if (error instanceof SyntaxError) {
                    console.log(error);
                    setError(error);
                    setLoaded(false);
                    throw new Error('Respuesta no válida del servidor');
                }
            });
    }, [userData.id]);

    //Cantidad Canjes agrupados por materiales del año actual
    useEffect(() => {
        ReportesServcies.getCantCanjesXmaterialAnnioActual(userData.id)
            .then((response) => {
                const dataGraph = response.data.results;
                const formatData = dataGraph.map((item) => ({
                    Material: item.descripcion,
                    Cantidad: parseInt(item.CantidadCanjes),
                }));

                setDataCanjesAnnio(formatData);
                setLoaded(true);
            })
            .catch((error) => {
                setDataCanjesAnnio(null);
                if (error instanceof SyntaxError) {
                    console.log(error);
                    setError(error);
                    setLoaded(false);
                    throw new Error('Respuesta no válida del servidor');
                }
            });
    }, [userData.id]);

    //Total de eco-monedas generadas en el centro de acopio
    useEffect(() => {
        ReportesServcies.getTotalGenerado(userData.id)
            .then((response) => {
                const dataGraph = response.data.results;
                const formatData = dataGraph.map((item) => ({
                    Centro: item.nombre,
                    Total: parseInt(item.TotalGenerado),
                }));

                setDataTotalGenerado(formatData);
                setLoaded(true);
            })
            .catch((error) => {
                setDataTotalGenerado(null);
                if (error instanceof SyntaxError) {
                    console.log(error);
                    setError(error);
                    setLoaded(false);
                    throw new Error('Respuesta no válida del servidor');
                }
            });
    }, [userData.id]);

    if (error) return <p>Error: {error.message}</p>;
    return (
        <>
            {!loaded && <div>Cargando...</div>}
            {dataCanjesMensuales && (
                <>
                    <h2 style={{ textAlign: 'center', margin: '50px 0 20px' }}>Cantidad de canjes realizados en el mes</h2>
                    <ResponsiveContainer width="100%" height={500} key={1}>
                        <BarChart data={dataCanjesMensuales}>
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
            {dataCanjesAnnio && (
                <>
                    <h2 style={{ textAlign: 'center', margin: '70px 0 20px' }}>Canjes agrupados por materiales en el año actual</h2>
                    <ResponsiveContainer width="100%" height={500} key={1}>
                        <BarChart data={dataCanjesAnnio}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="Material" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                                dataKey="Cantidad"
                                fill="#65d3da"
                                stroke="#000000"
                                strokeWidth={1}
                                barSize={30}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </>
            )}
            {dataTotalGenerado && (
                <>
                    <h2 style={{ textAlign: 'center', margin: '70px 0 20px' }}>Total de eco-monedas generadas</h2>
                    <ResponsiveContainer width="100%" height={500} key={1} style={{ marginBottom: '50px' }}>
                        <BarChart data={dataTotalGenerado}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="Centro" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                                dataKey="Total"
                                fill="#cbe989"
                                stroke="#000000"
                                strokeWidth={1}
                                barSize={30}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </>
            )}
        </>
    );
}
