import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "canton";

class CantonService {

  getCanton() {
    return axios.get(BASE_URL);
  }
  getCantonByIdProvincia(provincia) {
    return axios.get(BASE_URL + "/" + "getCantonByIdProvincia" +"/"+ provincia);
  }

}
export default new CantonService();