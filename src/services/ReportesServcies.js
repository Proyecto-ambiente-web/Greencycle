import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "Reportes";

class ReportesService {

  //Admin de centro de acopio
  getCantCanjesMesActual(reporte) {
    return axios.get(BASE_URL + "/" + "getCantCanjesMesActual" + "/" + reporte);
  }

  getCantCanjesXmaterialAnnioActual(reporte) {
    return axios.get(BASE_URL + "/" + "getCantCanjesXmaterialAnnioActual" + "/" + reporte);
  }

  getTotalGenerado(reporte) {
    return axios.get(BASE_URL + "/" + "getTotalGenerado" + "/" + reporte);
  }

  //Admin del sistema
  getTotalMonedasXCentro(reporte) {
    return axios.get(BASE_URL + "/" + "getTotalMonedasXCentro" + "/" + reporte);
  }

  getCantTotalCanjesDelMes(reporte) {
    return axios.get(BASE_URL + "/" + "getCantTotalCanjesDelMes" + "/" + reporte);
  }

  getEstadisticaMonedasXcentroAnnioActual(reporte) {
    return axios.get(BASE_URL + "/" + "getEstadisticaMonedasXcentroAnnioActual" + "/" + reporte);
  }

  getCantCanjesCuponesAnnioActual(reporte) {
    return axios.get(BASE_URL + "/" + "getCantCanjesCuponesAnnioActual" + "/" + reporte);
  }

  getTotalEcomonedasUtilizadasEnAnioActual(reporte) {
    return axios.get(BASE_URL + "/" + "getTotalEcomonedasUtilizadasEnAnioActual" + "/" + reporte);
  }
}

export default new ReportesService();