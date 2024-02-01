import React from 'react';

// Modal to notify user of success/error messages when logging in and registering
const LoginRegisterModal = ({ message, onClose, messageType }) => {
    const modalStyle = {
        color: messageType === 'success' ? 'green' : 'red',
    };

    return (
        <div className="modal-backdrop">
            <div className="modal" style={modalStyle}>
                <p>{message}</p>
                <button onClick={onClose}>OK</button>
            </div>
        </div>
    );
};

export default LoginRegisterModal;