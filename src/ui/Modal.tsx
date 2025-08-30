import {
  cloneElement,
  createContext,
  useContext,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/commons/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

interface ModalContextType {
  openName: string;
  close: () => void;
  openWindow: (name: string) => void;
}

interface OpenProps {
  children: ReactElement<{ onClick?: () => void }>;
  opens: string;
}

interface WindowProps {
  children: ReactElement<{ onCloseModal?: () => void }>;
  name: string;
}

// createPortal help rendering jsx outside of DOM structure but keep the structure of react component
// in order to keep state, prop passing...
// reason why using portal is to avoid conflicting with overflow setting to hidden from parent

// compount component

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const Modal = ({ children }: { children: ReactNode }) => {
  const [openName, setOpenName] = useState<string>("");

  const close = () => setOpenName("");
  const openWindow = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, openWindow }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open = ({ children, opens: opensWindowName }: OpenProps) => {
  // beacause the concept of context API is not be able to use outside of context provider
  // if context cant be retrieved, then throw error
  const context = useContext(ModalContext);
  if (!context) throw new Error("Modal.Open must be used within Modal");

  return cloneElement(children, {
    onClick: () => context.openWindow(opensWindowName),
  });
};

const Window = ({ children, name }: WindowProps) => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Modal.Window must be used within Modal");
  const { openName, close: closeModal } = context;

  const { styledModalref } = useOutsideClick<HTMLDivElement>(closeModal);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <div>
        <StyledModal ref={styledModalref}>
          <Button onClick={closeModal}>
            <HiXMark />
          </Button>

          <div>{cloneElement(children, { onCloseModal: closeModal })}</div>
        </StyledModal>
      </div>
    </Overlay>,
    document.body
  );
};

Modal.Open = Open;
Modal.Window = Window;

// normal component
// const Modal = ({ children, onClose }: ModalProps) => {
//   return createPortal(
//     <Overlay>
//       <div>
//         <StyledModal>
//           <Button onClick={onClose}>
//             <HiXMark />
//           </Button>

//           <div>{children}</div>
//         </StyledModal>
//       </div>
//     </Overlay>,
//     document.body
//   );
// };

export default Modal;
