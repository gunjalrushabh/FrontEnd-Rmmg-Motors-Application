
import axios from 'axios';
import { BASE_API_URL } from '../common/constants';
import { authHeader } from './base.service';
const API_URL = BASE_API_URL + '/api/vehicle'
class VehicleService {

    saveVehicle(vehicle){
        return axios.post(API_URL, vehicle, {headers: authHeader()});
    }

    deleteVehicle(vehicle){
        return axios.delete(API_URL + '/' + vehicle.id, {headers:authHeader()})
    }


    getAllVehicles(){
        return axios.get(API_URL);
    }
}

export default new VehicleService();