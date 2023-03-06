import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Modal } from "react-bootstrap";
import Vehicle from "../models/vehicle";
import vehicleService from "../services/vehicle.service";
const VehicleSave = forwardRef((props, ref) => {

    useImperativeHandle(ref, () =>
    ({
        showVehicleModal() {
            setTimeout(()=>{
                setShow(true);
            },0);
            

        }
    }));

    useEffect(() => {
        setVehicle(props.vehicle);
    },[props.vehicle]);

    const [vehicle, setVehicle] = useState(new Vehicle('', 0, '', '', '', '', ''));
    const [errorMessage, setErrorMessage] = useState('');
    const [submitted, setsubmitted] = useState(false);
    const [show, setShow] = useState(false);
    const saveVehicle = (e) => {
        e.preventDefault();

        setsubmitted(true);

        if (!vehicle.vehicleName || !vehicle.vehiclePower || !vehicle.vehicleTorque || !vehicle.price || !vehicle.fuelType || !vehicle.engineDisplacement) {
            return;
        }

        vehicleService.saveVehicle(vehicle).then(response => {
            
            props.onSaved(response.data);
            setShow(false);
            setsubmitted(false);

        }).catch(err => {
            setErrorMessage("Unexpected error occcured");
            console.log(err);
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setVehicle((prevState => {
            return {
                ...prevState,
                [name]: value
            };
        }));
    };
    return (

        <Modal show={show}>

            <form onSubmit={(e) => saveVehicle(e)} noValidate
                className={submitted ? 'was-validated' : ''}>

                <div className="modal-header">
                    <h5 className="modal-title">Vehicles Details</h5>
                    <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
                </div>

                <div className="modal-body">

                    {
                        errorMessage &&
                        <div className="alert alert-danger">
                            {errorMessage}
                        </div>
                    }

                    <div className="form-group">
                        <label htmlFor="vehicleName">Name: </label>
                        <input
                            type="text"
                            name="vehicleName"
                            placeholder="vehicleName"
                            className="form-control"
                            value={vehicle.vehicleName}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <div className="invalid-feedback">
                            Name is required.
                        </div>
                    </div>


                    <div className="form-group">
                        <label htmlFor="price">price: </label>
                        <input
                            type="number"
                            min="1"
                            step="any"
                            name="price"
                            placeholder="price"
                            className="form-control"
                            value={vehicle.price}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <div className="invalid-feedback">
                            price is required.
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="vehiclePower">vehiclePower: </label>
                        <input
                            type="text"
                            name="vehiclePower"
                            placeholder="vehiclePower"
                            className="form-control"
                            value={vehicle.vehiclePower}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <div className="invalid-feedback">
                            vehiclePower is required.
                        </div>
                    </div>


                    <div className="form-group">
                        <label htmlFor="vehicleTorque">vehicleTorque: </label>
                        <input
                            type="text"
                            name="vehicleTorque"
                            placeholder="vehicleTorque"
                            className="form-control"
                            value={vehicle.vehicleTorque}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <div className="invalid-feedback">
                            vehicleTorque is required.
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="engineDisplacement">EngineDisplacement: </label>
                        <input
                            type="text"
                            name="engineDisplacement"
                            placeholder="engineDisplacement"
                            className="form-control"
                            value={vehicle.engineDisplacement}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <div className="invalid-feedback">
                            EngineDisplacement is required.
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="fuelType">FuelType: </label>
                        <input
                            type="text"
                            name="fuelType"
                            placeholder="fuelType"
                            className="form-control"
                            value={vehicle.fuelType}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <div className="invalid-feedback">
                            FuelType is required.
                        </div>
                    </div>



                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>Close</button>
                    <button type="submit" className="btn btn-primary">Save Changes</button>

                </div>
            </form>
        </Modal>


    );

});

export { VehicleSave };