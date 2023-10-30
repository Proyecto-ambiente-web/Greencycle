import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'canjeoMaterial';

class HistorialCanjeosServices {

    getHistorialCanjeo() {
        return axios.get(BASE_URL);
    }

    getHistorialCanjeoByIdUsuario(idUsuario) {
        return axios.get(BASE_URL + '/' + idUsuario)
    }

    getHistorialCanjeoDetalleByIdCanjeo(idCanjeo) {
        return axios.get(BASE_URL + '/getdetalle/' + idCanjeo)
    }
}
export default new HistorialCanjeosServices();
