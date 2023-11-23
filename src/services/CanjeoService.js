import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "canjeoMaterial";

class CantonService {

    getMaterialesCentro(idAdmin) {
    return axios.get(BASE_URL + "/" + "getMaterialesCentro" +"/"+ idAdmin);
  }

}
export default new CantonService();