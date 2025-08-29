import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

// implementing compound component

const AddCabin = () => {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
};

// const AddCabin = () => {
//     const [isOpenModal, setisOpenModal] = useState(false);
//     return (
//         <div>
//             <Button
//                 variation="primary"
//                 onClick={() => setisOpenModal((show) => !show)}
//             >
//                 Add new cabin
//             </Button>
//             {isOpenModal && <Modal onClose={() => setisOpenModal(false)}><CreateCabinForm onClose={() => setisOpenModal(false)} /></Modal>}
//         </div>
//     )
// }

export default AddCabin;
