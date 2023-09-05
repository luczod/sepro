import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCheck, FaX } from "react-icons/fa6";
import { ContainerBtn } from './styles';

type ConfirmActionFunction = () => void;

const ConfirmationToast: React.FC<{
  message: string;
  onConfirm: ConfirmActionFunction;
}> = ({ message, onConfirm }) => {
  const handleConfirm = () => {
    toast.dismiss();
    onConfirm();
     // Close the toast after confirming
  };

  const handleCancel = () => {
    toast.dismiss(); // Close the toast if canceled
  };

  return (
    <div>
      <h5>{message}</h5>
      <ContainerBtn>
        <button className='btn btn-outline-success' onClick={handleConfirm}><FaCheck/></button>
        <button className='btn btn-outline-danger' onClick={handleCancel}><FaX /></button>
      </ContainerBtn>
    </div>
  );
};

export  const ConfirmToast = (message: string, callback: ConfirmActionFunction) => {
  toast.dismiss(); // Dismiss any previous toasts
  toast.warn(<ConfirmationToast message={message} onConfirm={callback} />, {
    position: 'top-center',
    autoClose: false, // Keep the toast open until user action
    closeOnClick: false, // Keep the toast open on click
    draggable: false, // Disable dragging
    theme: 'light'
  });
};

/* const ConfirmToastBox: React.FC = () => {
  const handleConfirmedAction = () => {
    // Your action logic here
    alert('Action confirmed!');
  };

  return (
    <div>
      <button
        onClick={() => executeAfterConfirmation('Are you sure you want to perform this action?', handleConfirmedAction)}
      >
        Perform Action
      </button>
      <ToastContainer />
    </div>
  );
};

export default ConfirmToastBox; */
