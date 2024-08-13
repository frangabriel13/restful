import React, { useState } from "react";
import s from "./Gallery.module.css";

const Gallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className={s.container}>
      <div className={s.selectedImageContainer}>
        <img src={selectedImage} alt="Selected" className={s.selectedImage} />
      </div>
      <div className={s.thumbnailContainer}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={s.thumbnail}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
    </div>
  );
};


export default Gallery;