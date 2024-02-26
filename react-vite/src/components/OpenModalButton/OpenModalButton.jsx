import { useModal } from '../../context/Modal';
import LoginFormModal from '../LoginFormModal/LoginFormModal';

function OpenModalButton({
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(<LoginFormModal />);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return <button onClick={onClick}>{buttonText}</button>;
}

export default OpenModalButton;
