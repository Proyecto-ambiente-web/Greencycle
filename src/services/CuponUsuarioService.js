import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'CuponesUsuario';

class CuponUsuarioService {

    crearCuponUsuario(param) {
        return axios.post(BASE_URL, param);
    }

    getCuponByIdUsuario(CuponId) {
        return axios.get(BASE_URL + '/' +'getCuponByIdUsuario' + '/' + CuponId)
    }
}
export default new CuponUsuarioService();
