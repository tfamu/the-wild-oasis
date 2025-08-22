import { useState } from "react";
import Button from "../../ui/Button"
import CreateCabinForm from "./CreateCabinForm"
import Modal from "../../ui/Modal";

const AddCabin = () => {
    const [isOpenModal, setisOpenModal] = useState(false);
    return (
        <div>
            <Button
                variation="primary"
                onClick={() => setisOpenModal((show) => !show)}
            >
                Add new cabin
            </Button>
            {isOpenModal && <Modal onClose={() => setisOpenModal(false)}><CreateCabinForm onClose={() => setisOpenModal(false)} /></Modal>}
        </div>
    )
}

export default AddCabin
