import React, { useState, useEffect } from 'react';
import { storage } from '../firebase';
import { ref, listAll, getDownloadURL, StorageReference } from 'firebase/storage';
import './ImageGallery.css';

const ImageGallery: React.FC = () => {
  const [fullscreen, setFullscreen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const imagesListRef = ref(storage, 'images/');

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const response = await listAll(imagesListRef);
        const urls = await Promise.all(
          response.items.map(async (item: StorageReference) => {
            const url = await getDownloadURL(item);
            return url;
          })
        );
        setImageUrls(urls);
      } catch (error) {
        console.error('Error fetching image URLs:', error);
      }
    };

    fetchImageUrls();
  }, [imagesListRef]);

  const openFullscreen = (index: number) => {
    setSelectedImageIndex(index);
    setFullscreen(true);
  };

  const closeFullscreen = () => {
    setFullscreen(false);
  };

  const navigate = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setSelectedImageIndex((prevIndex) => Math.max(0, prevIndex - 1));
    } else {
      setSelectedImageIndex((prevIndex) => Math.min(imageUrls.length - 1, prevIndex + 1));
    }
  };

  return (
    <div>
      <div className="image-grid">
        {imageUrls.map((url, index) => (
          <img key={index} src={url} className="gallery-image" onClick={() => openFullscreen(index)} />
        ))}
      </div>

      {fullscreen && (
        <div className="fullscreen-overlay">
          <button className="close-button" onClick={closeFullscreen}>
            Close
          </button>
          <button className="nav-button" onClick={() => navigate('prev')}>
            Prev
          </button>
          <img
            className="fullscreen-image"
            src={imageUrls[selectedImageIndex]}
            alt={`Fullscreen Sketch ${selectedImageIndex + 1}`}
          />
          <button className="nav-button" onClick={() => navigate('next')}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
