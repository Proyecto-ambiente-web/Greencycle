import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'TipoCupones';

class TipoCuponesService {

    getTipoCupones() {
        return axios.get(BASE_URL);
    }

    

}
export default new TipoCuponesService();
