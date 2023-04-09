import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { deleteUser } from "../services/UserService";
import { toast } from "react-toastify";
import _ from "lodash";

const ModalConfirm = (props) => {
  const { show, handleClose, dataUserDelete, handleDeleteUserFormModal } =
    props;

  const confirmDelete = async () => {
    let res = await deleteUser(dataUserDelete.id);

    if (res && +res.statusCode === 204) {
      handleClose();
      toast.success("Delete User Success!");
      handleDeleteUserFormModal(dataUserDelete);
    } else {
      toast.error("Error Delete User!");
    }

    console.log(">>> check res: ", res);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete a User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            This action can't be undone! Do want to delete this user ? <br />
            <b> email = {dataUserDelete.email}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => confirmDelete()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalConfirm;
