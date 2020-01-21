import React from 'react';

import './InputComponent.css';

const InputComponent = props => {
    const { placeholder, onChangeHandler } = props;

    return <input
        className="gallery__panel-input"
        placeholder={ placeholder }
        onChange={ event => onChangeHandler(event) }
    />;
};

export default InputComponent;

// import BaseComponent from './BaseComponent';
//
// export default class InputComponent extends BaseComponent {
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
