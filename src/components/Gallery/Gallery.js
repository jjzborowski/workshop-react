import {
    apiGetImages,
    apiRemoveImageById,
    apiRemoveImages,
    apiSetImage,
} from 'common/api';
import {
    PICSUM_URL,
    random,
} from 'common/constants';
import Button from 'components/Button/Button';
import React, {
    useEffect,
    useState,
} from 'react';
import GalleryCell from '../GalleryCell/GalleryCell';
import Input from '../Input/Input';
import './Gallery.css';

const Gallery = props => {
    const [images, setImages] = useState({});
    const [generatedAmount, setGeneratedAmount] = useState(0);

    const getImages = () => {
        apiGetImages()
            .then(response => {
                if (response) {
                    const newImages = {};
                    Object.values(response)
                        .forEach(image => {
                            if (!images[image.id]) {
                                newImages[image.id] = image;
                            }
                        });
                    setImages({ ...images, ...newImages });
                }
            });
    };

    const renderImages = () => {
        return Object.entries(images)
            .map(([id, image]) => <GalleryCell
                key={ id }
                id={ id }
                content={ image }
                onRemove={ removeImageById }
            />);
    };

    const getGeneratedAmount = event => setGeneratedAmount(event.target.value);

    const generateImages = () => {
        const newImages = {};
        for (let i = 0; i < (
            generatedAmount || 5
        ); i++) {
            let id = random(1, 1000)
                .toString();
            let imageData = {
                id,
                src: `${ PICSUM_URL }id/${ id }/200/200`,
            };
            newImages[id] = imageData;

            apiSetImage(imageData)
                .then(response => {
                    console.log('setImage', response);
                });
        }

        setImages({ ...images, ...newImages });
    };

    const removeImageById = (imageId) => {
        const confirmation = confirm('Do you want to remove this image?');
        if (confirmation) {
            apiRemoveImageById(imageId)
                .then(() => {
                    const updatedImages = { ...images };
                    delete updatedImages[imageId];
                    setImages(updatedImages);
                });
        }
    };

    const removeImages = () => {
        const confirmation = confirm('Do you want to remove all images?');
        if (confirmation) {
            apiRemoveImages()
                .then(() => {
                    setImages({});
                });
        }
    };

    useEffect(() => {
        getImages();
    }, []);

    return <div className="gallery">
        <div className="gallery__panel">
            <Input
                placeholder="Amount of generated images..."
                onChangeHandler={ getGeneratedAmount }
            />
            <Button
                content="Generate images"
                onClickHandler={ generateImages }
            />
            <Button
                content="Clear gallery"
                onClickHandler={ removeImages }
            />
        </div>
        <div className="gallery__container">
            { renderImages() }
        </div>
    </div>;
};

export default Gallery;

// import {
//     apiGetImages,
//     apiRemoveImageById,
//     apiRemoveImages,
//     apiSetImage,
// } from 'common/api';
// import {
//     PICSUM_URL,
//     random,
// } from 'common/constants';
// import {
//     ButtonComponentType,
//     GalleryComponentType,
//     GalleryImagesTypes,
//     InputComponentType,
// } from 'common/interfaces';
// import Button from './Button';
// import BaseComponent from './BaseComponent';
// import GalleryCell from './GalleryCell';
// import Image from './Image';
// import Input from './Input';
//
// export default class Gallery extends BaseComponent implements GalleryComponentType {
//     images: GalleryImagesTypes;
//     component: HTMLElement;
//     galleryPanel: HTMLElement;
//     galleryContainer: HTMLElement;
//     input: InputComponentType;
//     generateButton: ButtonComponentType;
//     clearButton: ButtonComponentType;
//
//     constructor(props:any) {
//         super(props);
//
//         this.images = {};
//         this.initTemplate();
//         this.getImages();
//     }
//
//     initTemplate = (): void => {
//         this.component = document.createElement('div');
//         this.component.classList.add('gallery');
//
//         // define panel
//         this.galleryPanel = document.createElement('div');
//         this.galleryPanel.classList.add('gallery__panel');
//
//         // define container
//         this.galleryContainer = document.createElement('div');
//         this.galleryContainer.classList.add('gallery__container');
//
//         // define input
//
//         this.input = new Input({
//             id: 'imageAmountInput',
//             target: this.galleryPanel,
//         });
//
//         // define buttons
//         this.generateButton = new Button({
//             id: 'generateButton',
//             target: this.galleryPanel,
//             content: 'Generate images',
//             onClickHandler: this.generateImages,
//         });
//         this.clearButton = new Button({
//             id: 'clearButton',
//             target: this.galleryPanel,
//             content: 'Clear gallery',
//             onClickHandler: this.removeImages,
//         });
//
//         // add elements to gallery
//         this.galleryPanel.appendChild(this.generateButton.component);
//         this.galleryPanel.appendChild(this.clearButton.component);
//         this.component.appendChild(this.galleryPanel);
//         this.component.appendChild(this.galleryContainer);
//         this.target.appendChild(this.component);
//     };
//
//     getImages = (): void => {
//         apiGetImages()
//             .then(response => {
//                 if (response) {
//                     for (let [id, image] of Object.entries(response)) {
//                         if (!this.images[id]) {
//                             this.images[id] = new Image({
//                                 id: id,
//                                 target: this.component,
//                                 content: image,
//                             });
//                         }
//                     }
//                     this.fillGallery();
//                 }
//             });
//     };
//
//     fillGallery = (): void => {
//         Object.values(this.images)
//             .forEach(imageComponent => {
//                 if (!document.getElementById(imageComponent.id)) {
//                     new GalleryCell({
//                         id: imageComponent.id,
//                         target: this.galleryContainer,
//                         content: imageComponent,
//                         onRemove: this.removeImageById,
//                     });
//                 }
//             });
//     };
//
//     generateImages = (): void => {
//         for (let i = 0; i < ((<HTMLInputElement>this.input.component).value || 5); i++) {
//             let id = random(1, 1000).toString();
//             let imageData = {
//                 id,
//                 src: `${PICSUM_URL}id/${ id }/200/200`,
//             };
//
//             if (!this.images[id]) {
//                 this.images[id] = new Image({
//                     id: id,
//                     target: this.component,
//                     content: imageData,
//                 });
//                 apiSetImage(imageData)
//                     .then(response => {
//                         console.log('setImage', response);
//                     });
//             }
//         }
//         this.fillGallery();
//     };
//
//     removeImageById = (imageId: string): void => {
//         const confirmation = confirm('Do you want to remove this image?');
//         if (confirmation) {
//             apiRemoveImageById(imageId)
//                 .then(() => {
//                     delete this.images[imageId];
//                     this.galleryContainer.removeChild(<Node>document.getElementById(imageId));
//                 });
//         }
//     };
//
//     removeImages = (): void => {
//         const confirmation = confirm('Do you want to remove all images?');
//         if (confirmation) {
//             apiRemoveImages()
//                 .then(() => {
//                     while (this.galleryContainer.firstChild) {
//                         this.galleryContainer.removeChild(this.galleryContainer.firstChild);
//                     }
//                     this.images = {};
//                 });
//         }
//     };
// };