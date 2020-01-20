import BaseComponent from './BaseComponent';

export default class GalleryCellComponent extends BaseComponent {
    constructor(props) {
        super(props);
        this.initTemplate(props);
    }

    initTemplate = ({ content, onRemove }) => {
        this.component = document.createElement('div');

        // define cell
        this.component.setAttribute('id', content.id);
        this.component.classList.add('gallery__cell');

        // define image element
        this.imageElement = document.createElement('div');
        this.imageElement.classList.add('gallery__image');
        this.imageElement.appendChild(content.component);

        // define image title
        this.imageTitleElement = document.createElement('div');
        this.imageTitleElement.classList.add('gallery__image-title');
        this.imageTitleElement.innerText = content.title;

        // define remove button
        this.removeButton = document.createElement('div');
        this.removeButton.classList.add('gallery__remove_button');
        this.removeButton.innerText = 'X';
        this.removeButton.addEventListener('click', () => onRemove(content.id));

        // add elements to cell
        this.component.appendChild(this.imageElement);
        this.component.appendChild(this.imageTitleElement);
        this.component.appendChild(this.removeButton);
        this.target.appendChild(this.component);
    };
};