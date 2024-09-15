import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { putUpdateUsers } from '../Services/UserServices'
import { first } from 'lodash';
import { toast } from 'react-toastify';
const ModalEditUsers = (props) => {
    const { show, handleClose, dataUserEdit, handleEditModalusers } = props
    const [name, setname] = useState("");
    const [job, setjob] = useState("");

    const handleEditUsers = async () => {
        let res = await putUpdateUsers(name, job)
        if (res && res.updatedAt)
            handleEditModalusers({
                first_name: name,
                id: dataUserEdit.id

            })
        handleClose();
        toast.success('update users succed !')
    }

    useEffect(() => {
        if (show) {
            setname(dataUserEdit.first_name)
        }
    }, [dataUserEdit])///dataUserEdit cos su thay doi thi se chay vao ham nay

    return (
        <>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new users</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className='Body-addnew'>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Add name</Form.Label>
                            <Form.Control type="email" placeholder="Enter Name"
                                value={name}
                                onChange={(event) => setname(event.target.value)}
                            />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Job</Form.Label>
                            <Form.Control type="password" placeholder="Enter Job"
                                value={job}
                                onChange={(event) => setjob(event.target.value)}
                            />
                        </Form.Group>

                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditUsers}>
                        submit
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}
export default ModalEditUsers;