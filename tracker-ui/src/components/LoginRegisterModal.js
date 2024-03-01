import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

// Modal to notify user of success/error messages when logging in and registering
const LoginRegisterModal = ({ message, onClose, messageType }) => {

    // Color type for success or error
    const color = messageType === 'success' ? 'green' : 'red';

    return (
        <Dialog open onClose={onClose} aria-labelledby="login-register-modal-title" PaperProps={{
            sx: { borderColor: 'var(--primary-color)', borderStyle: 'solid',borderWidth: '2px'}}}>
            <DialogTitle id="login-register-modal-title" sx={{ color }}>
                {messageType === 'success' ? 'Success' : 'Error'}
            </DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ color }}>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={onClose} 
                    sx={{ 
                    color: 'var(--button-text-color)', 
                    backgroundColor: color,
                    borderColor: color, 
                    '&:hover': { backgroundColor: 'grey', color: 'white' } 
                    }}>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LoginRegisterModal;