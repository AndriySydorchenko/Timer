import React from 'react';
import PropTypes from 'prop-types';

import {types} from "./types"
import style from './Button.module.scss'

const Button = React.forwardRef((props, ref) => {
    const { text, type, classType, additionalClass, handleClick, disabled } = props;
    const disabledClass = disabled ? 'button-disabled' : '';
    const className = `${style.button} ${style[types[classType]]} ${additionalClass} ${disabledClass}`;

    return (
        <button
            ref={ref}
            type={type}
            className={className}
            onClick={handleClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
});

export default Button;

Button.defaultProps = {
    additionalClass: '',
    type: 'button',
    disabled: false
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
        'button',
        'submit',
        'reset',
    ]),
    classType: PropTypes.oneOf([
        'basic',
        'outline',
        'inactive',
    ]).isRequired,
    additionalClass: PropTypes.string,
    handleClick: PropTypes.func,
    disabled: PropTypes.bool
};
