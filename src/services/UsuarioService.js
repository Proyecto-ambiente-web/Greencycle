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

    usuariosClientes(usuarioId) {
        return axios.get(BASE_URL + '/'+ 'usuarioClientes' + '/' + usuarioId)
    }

    loginUser(User){
        return axios.post(BASE_URL+ '/login/', User);
    }

    create(User){
        return axios.post(BASE_URL, User);
    }
}

export default new UsuarioService();