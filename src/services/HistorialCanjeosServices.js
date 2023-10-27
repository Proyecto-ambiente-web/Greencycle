import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'canjeoMaterial';

class HistorialCanjeosServices {

    getHistorialCanjeo() {
        return axios.get(BASE_URL);
    }

    getHistorialCanjeoById(idUsuario) {
        return axios.get(BASE_URL + '/' + idUsuario)
    }
}
export default new HistorialCanjeosServices();
