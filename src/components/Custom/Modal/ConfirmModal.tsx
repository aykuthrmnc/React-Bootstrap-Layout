import { FaExclamationCircle } from "react-icons/fa";
import { Button, Col, Modal } from "react-bootstrap";

const ConfirmModal = ({ value, confirm, confirmModal, setConfirmModal }: any) => {
  const toggle = () => setConfirmModal(!confirmModal);

  return (
    <Modal fade={false} isOpen={confirmModal} toggle={toggle} centered unmountOnClose backdrop="static">
      <Modal.Body className="d-flex flex-column align-items-center gap-3 py-4 text-center">
        <Col xs="3">
          <FaExclamationCircle size="100%" color="var(--orange-color-100)" />
        </Col>
        <div className="fs-5">Silme işlemini onaylıyor musunuz?</div>
        <div className="d-flex gap-4">
          <Button color="success" onClick={() => confirm(value)}>
            Onayla
          </Button>
          <Button color="danger" onClick={toggle}>
            Vazgeç
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmModal;
