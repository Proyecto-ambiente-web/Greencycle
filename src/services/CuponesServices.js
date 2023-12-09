import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'Cupones';

class CuponesService {

    getCupones() {
        return axios.get(BASE_URL);
    }

}
export default new CuponesService();
