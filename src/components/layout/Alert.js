import React from 'react'

 const Alert = ({alert}) => {
    if(alert === null){
        return null;
    } else {
        return (
        <div className={`alert alert-${alert.type}`}>
            <div className="fas fa-info-circle">
                {alert.msg}
            </div>
        </div>
        );
    }
    
}

export default Alert;
