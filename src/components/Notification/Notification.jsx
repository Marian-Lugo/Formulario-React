import { Snackbar, Alert } from "@mui/material";
import PropTypes from 'prop-types';

export default function Notification(props){
   
    const { notification, setNotification} = props;

    const closeNotification=()=>
      setNotification({
        open: false,
        message: "",
        severity: "",
      });

      return(
        <Snackbar
            
            open={notification.open}
            autoHideDuration={3000}
            onClose={closeNotification}
            anchorOrigin={{vertical: "top", horizontal:"center"}}
        >
            <Alert
                onClose={closeNotification}
                severity={notification.severity}
                sx={{ width:"100%" }}
            > 
            
            {notification.message}
            </Alert>
        </Snackbar>
      )
}

Notification.propTypes = {
    notification: PropTypes.shape({
        open: PropTypes.bool.isRequired,
        message: PropTypes.string.isRequired,
        severity: PropTypes.string.isRequired,
    }).isRequired,
    setNotification: PropTypes.func.isRequired,
};