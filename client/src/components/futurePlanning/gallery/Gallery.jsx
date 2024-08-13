import React, { useState, useEffect } from "react";
import s from "./Gallery.module.css";

const Gallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    setSelectedImage(images[currentIndex]);
  }, [currentIndex, images]);

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
            // className={s.thumbnail}
            className={`${s.thumbnail} ${selectedImage === image ? s.selectedThumbnail : ""}`}
            onClick={() => {
              setSelectedImage(image);
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};


export default Gallery;