import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";

// implementing compound component

const AddCabin = () => {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add new Cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>

      <Modal.Open opens="table">
        <Button>Cabin Table</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CabinTable />
      </Modal.Window>
    </Modal>
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
