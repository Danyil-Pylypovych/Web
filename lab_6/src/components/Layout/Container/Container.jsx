import React from 'react';
import classes from './Container.module.scss'
const Container = ({children}) => {
    return (
        <div className={classes.wrapper}>
            {children}
        </div>
    );
};

export default Container;
