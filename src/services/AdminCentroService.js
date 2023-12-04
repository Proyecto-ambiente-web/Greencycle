import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'AdminCentro';

class AdminCentroService {


    updateUsuario(usuario) {
        return axios.put(BASE_URL, usuario);
    }

}

export default new AdminCentroService();