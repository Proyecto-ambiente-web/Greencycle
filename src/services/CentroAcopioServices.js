import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'centroAcopio';

class CentroAcopioService {

    getCentrosAcopio() {
        return axios.get(BASE_URL);
    }

    getCentroAcopioById(centroId) {
        return axios.get(BASE_URL + '/' + centroId)
    }

    crearCentro(Centro) {
        return axios.post(BASE_URL, Centro);
    }

    getCentroFormById(Centro) {
        return axios.get(BASE_URL + "/getForm/" + Centro);
    }

    updateCentro(centro) {
        return axios.put(BASE_URL, centro);
    }

    getCentroAcopioXAdmin(Centro) {
        return axios.get(BASE_URL + "/getCentroAcopioXAdmin/" + Centro);
    }

    getCentrosActivos(Centro) {
        return axios.get(BASE_URL + "/getCentrosActivos/" + Centro);
    }
}
export default new CentroAcopioService();
