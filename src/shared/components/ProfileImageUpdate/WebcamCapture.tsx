import React, { useCallback, useRef } from 'react'
import Webcam from 'react-webcam'
import { Button } from '@mui/material'

import { dataURLToFile } from '../../helpers/applicationHelpers'

const videoConstraints = {
  width: 480,
  height: 480,
  facingMode: 'user'
}

export const WebcamCapture = ({
  setImgSrc,
  setTakePhoto,
  setSelectedImageFile,
  handleImageUpdate
}: {
  setImgSrc: React.Dispatch<React.SetStateAction<string | null>>
  setTakePhoto: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedImageFile?: React.Dispatch<React.SetStateAction<File | null>>
  handleImageUpdate?: any
}) => {
  const webcamRef = useRef<any>(null)

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    setImgSrc(imageSrc)
    setTakePhoto(false)

    if (setSelectedImageFile || handleImageUpdate) {
      const file = dataURLToFile(imageSrc, 'photo.jpg')
      setSelectedImageFile && setSelectedImageFile(file)
      handleImageUpdate && handleImageUpdate(file)
    }
  }, [webcamRef, setImgSrc, setTakePhoto, handleImageUpdate, setSelectedImageFile])

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        minScreenshotWidth={180}
        minScreenshotHeight={180}
      />
      <Button variant="contained" className="!mt-1" onClick={capture}>
        Capture Photo
      </Button>
    </>
  )
}
