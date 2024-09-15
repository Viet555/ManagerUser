import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { postNewUsers } from '../Services/UserServices'
import { toast } from 'react-toastify';

const ModalAddNew = (props) => {
    const { show, handleClose, usersUpdate } = props
    const [name, setname] = useState("");
    const [job, setjob] = useState("");

    const handleSaveUsers = async () => {
        const res = await postNewUsers(name, job)
        if (res && res.id) {
            //succes
            handleClose();
            setname('');
            setjob('')
            toast.success('Post new  Users succes ')
            usersUpdate({ first_name: name, id: res.id })
        } else {
            toast.error('empty !')
        }

    }
    return (
        <>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >

                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
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
                    <Button variant="primary" onClick={handleSaveUsers}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}
export default ModalAddNew;