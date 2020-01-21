import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from './components/GalleryComponent/GalleryComponent';
import './css/index.css';

ReactDOM.render(<Gallery />, document.getElementById('gallery'));


// import GalleryComponent from './components/GalleryComponent';
// import './css/index.css';
//
// const body = document.querySelector('body');
// new GalleryComponent({
//     target: body,
// });