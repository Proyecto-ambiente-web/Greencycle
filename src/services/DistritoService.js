import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "distrito";

class DistritoService {

  getDistrito() {
    return axios.get(BASE_URL);
  }
  getDistritoByCanton(canton) {
    return axios.get(BASE_URL + "/" + "getDistritoByCanton" + "/" + canton);
  }

}
export default new DistritoService();