
import { Modal, Button } from 'react-bootstrap';
import { DeleteUsers } from '../Services/UserServices';
import { toast } from 'react-toastify';
const ModalConfirm = (props) => {
    const { show, handleClose, dataUserDelete, DeleteUsersfromModal } = props

    const handleComfirm = async () => {
        let res = await DeleteUsers(dataUserDelete.id)
        if (res && res.statusCode === 204) {
            toast.success('Succes Delete user ')
            DeleteUsersfromModal(dataUserDelete)
            handleClose()


        } else {
            toast.error('Error delete user')
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
                    <Modal.Title ></Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className='Body-addnew text-danger  mx-5'>

                        <h5>Are you sure you want <b>DELETE</b> user</h5>
                        <br />
                        <b className='text-secondary'>Email= {dataUserDelete.email}?</b>

                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={handleComfirm}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}
export default ModalConfirm;