import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "billeteraVirtual";

class CanjeoService {

  getByIdUsuario(usuario) {
    return axios.get(BASE_URL + "/" + "getByIdUsuario" + "/" + usuario);
  }
}
export default new CanjeoService();