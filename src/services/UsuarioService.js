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

    getUsuarioBilletera(usuarioId) {
        return axios.get(BASE_URL + '/'+ 'getUsuarioBilletera' + '/' + usuarioId)
    }

    usuariosClientes(usuarioId) {
        return axios.get(BASE_URL + '/'+ 'usuarioClientes' + '/' + usuarioId)
    }

    getClientes(tipoUserId) {
        return axios.get(BASE_URL + '/'+ 'getClientes' + '/' + tipoUserId)
    }

    usuarioAdminCentro(id) {
        return axios.get(BASE_URL + '/'+ 'usuarioAdminCentro' + '/' + id)
    }

    loginUser(User){
        return axios.post(BASE_URL+ '/login/', User);
    }

    create(User){
        return axios.post(BASE_URL, User);
    }

    updateUsuario(usuario) {
        return axios.put(BASE_URL, usuario);
    }

    updateAdminCentro(usuario) {
        return axios.put(BASE_URL + '/'+ 'updateAdminCentro' + '/' , usuario);
    }
}

export default new UsuarioService();