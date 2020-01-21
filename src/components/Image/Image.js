import React from 'react';
import './Image.css';

const Image = props => {
    const { src } = props;

    return <div className="gallery__image">
        <img
            src={ src }
            alt=""
        />
    </div>;
};

export default Image;

// import BaseComponent from './BaseComponent';
//
// export default class Image extends BaseComponent {
//     constructor(data) {
//         super(data);
//         this.title = data.content.id;
//         this.initTemplate(data);
//     }
//
//     initTemplate = ({ content }) => {
//         this.template = document.createElement('img');
//         this.template.setAttribute('src', content.src);
//         this.target.appendChild(this.template);
//     };
// };