import React from 'react';

import './Input.css';

const Input = props => {
    const { placeholder, onChangeHandler } = props;

    return <input
        className="gallery__panel-input"
        placeholder={ placeholder }
        onChange={ event => onChangeHandler(event) }
    />;
};

export default Input;

// import BaseComponent from './BaseComponent';
//
// export default class Input extends BaseComponent {
//     constructor(props) {
//         super(props);
//         this.initTemplate(props.placeholder);
//     }
//
//     initTemplate = (placeholder = 'Amount of generated images...') => {
//         this.template = document.createElement('input');
//         this.component.setAttribute('placeholder', placeholder);
//         this.target.appendChild(this.template);
//     };
// };
