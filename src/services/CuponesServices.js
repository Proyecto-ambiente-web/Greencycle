import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'Cupones';

class CuponesService {

    getCupones() {
        return axios.get(BASE_URL);
    }

    getCuponById(CuponId) {
        return axios.get(BASE_URL + '/' + CuponId)
    }

    

    crearCupon(cupon) {
        return axios.post(BASE_URL, cupon);
      }

      updateCupon(cupon) {
        return axios.put(BASE_URL, cupon);
    }

}
export default new CuponesService();
