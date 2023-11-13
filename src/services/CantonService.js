import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "canton";

class CantonService {

  getCanton() {
    return axios.get(BASE_URL);
  }

}
export default new CantonService();