import React from "react";

const DisplayBox = ({ installment, closeModal }) => {
  return (
    <div className="modal" onClick={closeModal}>
      <div className="modal-content">
        Your monthly Installment is: ${installment}
      </div>
    </div>
  );
};

export default DisplayBox;
