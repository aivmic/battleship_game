import React from "react";
import Modal from "react-modal";
import "../styles/GameModal.css";

Modal.setAppElement("#root");

const GameModal = ({ isOpen, message, onClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="modal"
            overlayClassName="overlay"
        >
            <h2>{message}</h2>
            <button className="close-modal-button" onClick={onClose}>
                Close
            </button>
        </Modal>
    );
};

export default GameModal;
