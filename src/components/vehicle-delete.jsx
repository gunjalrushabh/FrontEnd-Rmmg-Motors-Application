import { forwardRef, useImperativeHandle, useState } from "react";
import { Modal } from "react-bootstrap";


const VehicleDelete = forwardRef((props,ref) => {

    const [show, setShow] = useState(false);
    useImperativeHandle(ref, () => ({

        showDeleteModal() {
            setShow(true);

        }
    }));

    const deleteVehicle = () => {
        props.onConfirmed();
        setShow(false);
    };

    return (
        <Modal show = {show}>

        <div className="modal-header">
        <h5 className="modal-title">Confirmation</h5>
        <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
        </div>

        <div className="modal-body">
            Are you want to Remove the selected Car?
        </div>

        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={() => deleteVehicle()}>I'm Sure !</button>
      </div>
        </Modal>

    );
});

export {VehicleDelete};