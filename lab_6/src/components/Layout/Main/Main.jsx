import React from 'react';

const Main = ({className, children}) => {

    const mainStyles = `${className}`
    return (
        <main className={mainStyles}>
            {children}
        </main>
    );
};

export default Main;
