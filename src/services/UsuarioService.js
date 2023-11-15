import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'usuario';

class UsuarioService {

    getUsuarios() {
        return axios.get(BASE_URL);
    }

    getUsuarioById(usuarioId) {
        return axios.get(BASE_URL + '/' + usuarioId)
    }

    getUsuarioDelCentroyLibres(usuarioId) {
        return axios.get(BASE_URL + '/'+ 'usuarioAdmin' + '/' + usuarioId)
    }
}

export default new UsuarioService();
