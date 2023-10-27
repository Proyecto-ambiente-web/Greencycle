import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'centroAcopio';

class CentroAcopioService {

    getCentrosAcopio() {
        return axios.get(BASE_URL);
    }

    getCentroAcopioById(centroId) {
        return axios.get(BASE_URL + '/' + centroId)
    }
}
export default new CentroAcopioService();
