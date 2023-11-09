import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'Material';

class MaterialService {

    getMateriales() {
        return axios.get(BASE_URL);
    }

    getMaterialById(MaterialId) {
        return axios.get(BASE_URL + '/' + MaterialId)
    }

    updateMaterial(Material){
        return axios.put(BASE_URL, Material);
    }
}
export default new MaterialService();
