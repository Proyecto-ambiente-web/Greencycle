import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "provincia";

class ProvinciaService {

  getProvincias() {
    return axios.get(BASE_URL);
  }

}
export default new ProvinciaService();