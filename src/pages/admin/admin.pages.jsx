import { useEffect, useRef, useState } from "react";
import { VehicleDelete } from "../../components/vehicle-delete";
import { VehicleSave } from "../../components/vehicle-save";
import vehicleService from "../../services/vehicle.service";
import Vehicle from './../../models/vehicle';

//function AdminPage
const AdminPage = () => {

    const [vehicleList, setVehicleList] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(new Vehicle('', 0, '', '', '', '', ''));
    const [errorMessage,setErrorMessage] = useState('');
  
    const saveComponent = useRef();
    const deleteComponent = useRef();

    useEffect(() => {

        vehicleService.getAllVehicles().then((response) => {

            setVehicleList(response.data);
        });
    }, []);

    const createVehicleRequest = () => {
        setSelectedVehicle(new Vehicle('', 0, '', '', '', '', ''));
        saveComponent.current?.showVehicleModal();

    };

    const editVehicleRequest = (item) => {

        setSelectedVehicle(Object.assign({}, item));
        saveComponent.current?.showVehicleModal();
    };

    const deleteVehicleRequest = (vehicle) => {
        setSelectedVehicle(vehicle);
        deleteComponent.current?.showDeleteModal();
    }



    const saveVehicleWatcher = (vehicle) => {

        let itemIndex = vehicleList.findIndex(item => item.id === vehicle.id);

        if (itemIndex !== -1) {
            const newList = vehicleList.map((item) => {
                if (item.id === vehicle.id) {
                    return vehicle;
                }
                return item;
            });
            setVehicleList(newList);
        }
        else {
            const newList = vehicleList.concat(vehicle);
            setVehicleList(newList);
        }

    };

    
    const deleteVehicle = () => {

        vehicleService.deleteVehicle(selectedVehicle).then(_ => { 
            setVehicleList(vehicleList.filter(x=> x.id !== selectedVehicle.id));
        }).catch(err => {
            setErrorMessage('Unexpected error Occured.');
            console.log(err);
        });
    };
    return (
        <div>
            <div className="container">
                <div className="pt-5">
                    {errorMessage &&

                            <div className="alert alert-danger">
                                {errorMessage}
                            </div>
                    }
                    {/* div.card>.card-header+div.card-body>table.table.table-striped */}
                    <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-6">
                                    <h3>All Vehicles</h3>
                                </div>

                                <div className="col-6 text-end">
                                    <button className="btn btn-primary" onClick={() => createVehicleRequest()}>
                                        Launch vehicle
                                    </button>
                                </div>
                            </div>


                        </div>
                        <div className="card-body">
                            <table className="table table-striped">

                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Power</th>
                                        <th scope="col">Torque</th>
                                        <th scope="col">EngineDisplacement</th>
                                        <th scope="col">Fuel</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vehicleList.map((item, ind) =>
                                        <tr key={item.id}>
                                            <th scope="row">{ind + 1}</th>
                                            <td>{item.vehicleName}</td>
                                            <td>₹ {item.price}</td>
                                            <td>{new Date(item.launchedDate).toLocaleDateString()}</td>
                                            <td>{item.vehiclePower}</td>
                                            <td>{item.vehicleTorque}</td>
                                            <td>{item.engineDisplacement}</td>
                                            <td>{item.fuelType}</td>


                                            <td>
                                                <button className="btn btn-primary me-1" onClick={() => editVehicleRequest(item)}>
                                                    Edit
                                                </button>
                                                <button className="btn btn-danger" onClick={() => deleteVehicleRequest(item)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )}

                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>

            <VehicleSave ref={saveComponent} vehicle={selectedVehicle} onSaved={(p) => saveVehicleWatcher(p)} />
                
            <VehicleDelete ref ={deleteComponent} onConfirmed={() => deleteVehicle()} />
        </div>


    );
};

export { AdminPage };