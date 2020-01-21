import React from 'react';

import './Button.css';

const BaseComponent = props => {
    const { content, onClickHandler } = props;

    return (
        <button
            onClick={ event => onClickHandler(event) }
            className="gallery__panel-button"
        >
            { content }
        </button>
    );
};

export default BaseComponent;

// import BaseComponent from './BaseComponent';
//
// export default class Button extends BaseComponent {
//     constructor(props) {
//         super(props);
//         this.initTemplate(props);
//     }
//
//     initTemplate = ({ content, onClickHandler }) => {
//         this.template = document.createElement('button');
//         this.template.innerText = content;
//         this.template.addEventListener('click', onClickHandler);
//         this.target.appendChild(this.template);
//     };
// };