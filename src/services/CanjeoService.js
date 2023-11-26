import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "canjeoMaterial";

class CanjeoService {

  getMaterialesCentro(idAdmin) {
    return axios.get(BASE_URL + "/" + "getMaterialesCentro" + "/" + idAdmin);

  }

  crearCanjeo(canjeo) {
    return axios.post(BASE_URL, canjeo);
  }

}
export default new CanjeoService();