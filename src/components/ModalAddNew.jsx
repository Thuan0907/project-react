import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { postCreateUser } from "../services/UserService";
import { toast } from "react-toastify";

const ModalAddNew = (props) => {
  const { show, handleClose, handleUpdateTable } = props;

  const [name, setName] = useState("");

  const [job, setJob] = useState("");

  //   useEffect(() => {
  //     handleSaveUser(name, job);
  //   });

  const handleSaveUser = async () => {
    let res = await postCreateUser(name, job);
    console.log(res);

    // validate
    if (name === "") {
      toast.error("Name is empty");
      return;
    }

    if (job === "") {
      toast.error("Job is empty");
      return;
    }

    if (name !== "" && job !== "") {
      // success
      handleClose();
      setName("");
      setJob("");
      toast.success("A User  is created succeed!");
      handleUpdateTable({ first_name: name, id: res.id });
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Job</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Job"
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                />
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddNew;
