// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

function Modal({ isOpen, onClose, onConfirm }) {
  return (
    <>
    {/* Check if Modal is displayed on screen */}
      {isOpen &&
        <div className="modal-background">
          <div className="modal">
            <h2>Are you sure you want to delete?</h2>
            <div className="modal-buttons">
              {/* If click yes, proceed with delete process through triggering onConfirm property on TechItemList component */}
              <button onClick={onConfirm} className="modal-button confirm">Yes</button>
              {/* If click no, close Modal through triggering onClose property on TechItemList component */}
              <button onClick={onClose} className="modal-button cancel">No</button>
            </div>
          </div>
        </div>
      }
    </>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.func,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
}
export default Modal
