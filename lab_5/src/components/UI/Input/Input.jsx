import React from 'react';
import classes from './Input.module.scss';

const Input = ({
                   id,
                   labelText,
                   type,
                   value,
                   onChange,
                   placeholder,
                   isRequired,
                   name,
                   className,
    checked
               }) => {
    const inputStyles = `${classes.input} ${className}`;
    return (
        <>

            {labelText && <label htmlFor={id}>{labelText}</label>}
            <input
                className={inputStyles}
                id={id}
                type={type || 'text'}
                value={value}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                required={isRequired}
                checked={checked}
            />

        </>
    );
};

export default Input;
