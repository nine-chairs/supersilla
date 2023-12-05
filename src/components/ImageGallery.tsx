import React, { useState } from 'react'
import './ImageGallery.css'
import image1 from '../mock-images/2_tokyo_15.07.15.jpg'
import image2 from '../mock-images/4_tokyo16.07.15.jpg'
import image3 from '../mock-images/7_acera 1_06.08.16.jpg'
import image4 from '../mock-images/11_zazvor_06.08.16.jpg'
import image5 from '../mock-images/12_tokyo cityscape_06.08.15.jpg'
import image6 from '../mock-images/14_carrer arago pati_11.03.16.jpg'
import image7 from '../mock-images/15_roof study 1_22.08.15.jpg'
import image8 from '../mock-images/16_marina_11.03.16.jpg'
import image9 from '../mock-images/16_mesones_20.08.16.jpg'
import image10 from '../mock-images/17_nurbs egres_06.08.15.jpg'
import image11 from '../mock-images/18_impala_24.08.16.jpg'
import image12 from '../mock-images/20_chata evolucia_25.08.15.jpg'
import image13 from '../mock-images/21_budova poble nou_15.03.16.jpg'
import image14 from '../mock-images/24_recursive asanoha_23.08.15.jpg'
import image15 from '../mock-images/28_egrese_26.03.16.jpg'
import image16 from '../mock-images/35_cuarto diputacio_21.04.16.jpg'

const images: string[] = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image12,
  image13,
  image14,
  image15,
  image16,
]



const ImageGallery: React.FC = () => {
  const [fullscreen, setFullscreen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const openFullscreen = (index: number) => {
    setSelectedImageIndex(index)
    setFullscreen(true)
  }

  const closeFullscreen = () => {
    setFullscreen(false)
  }

  const navigate = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setSelectedImageIndex((prevIndex) => Math.max(0, prevIndex - 1))
    } else {
      setSelectedImageIndex((prevIndex) => Math.min(images.length - 1, prevIndex + 1))
    }
  }

  return (
    <div>
      <div className="image-grid">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Sketch ${index + 1}`}
            className="gallery-image"
            onClick={() => openFullscreen(index)}
          />
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
            src={images[selectedImageIndex]}
            alt={`Fullscreen Sketch ${selectedImageIndex + 1}`}
          />
          <button className="nav-button" onClick={() => navigate('next')}>
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default ImageGallery
