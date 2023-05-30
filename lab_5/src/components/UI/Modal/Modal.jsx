import React from 'react';
import classes from './Modal.module.scss';
import ReactDOM from "react-dom";

const Modal = ({headerText,children}) => {
    return (
        ReactDOM.createPortal(<section className={`${classes.modal} $`} id="modal">
            <div className={classes['modal-content']}>
                <div className={classes['modal-header']}>
                    <h3 className={classes['modal-title']}>{headerText}</h3>
                </div>
                <div className={classes['modal-body']}>
                    {children}
                </div>
            </div>
        </section>, document.getElementById('modal_frame'))
    );
};

export default Modal;
