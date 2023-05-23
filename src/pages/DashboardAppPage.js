import React, { useState } from "react";

import { Helmet } from 'react-helmet-async';

import {Container, Typography } from '@mui/material';
import { Card, CardContent, Button } from "@mui/material";
import { useDispatch } from "react-redux"
import { postResultatDemandeExamen } from "../Redux/actions/imagerie"


// components

// sections


// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  // eslint-disable-next-line
  const dispatch = useDispatch()
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [showImage, setShowImage] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scale, setScale] = useState(1);

  const handleFileInput = (event) => {
    const files = event.target.files;
    const urls = [];
    for (let i = 0; i < files.length; i++) {
      urls.push(URL.createObjectURL(files[i]));
    }
    setSelectedFiles(files);
    setPreviewUrls(urls);
  };

  /** 

    const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
  
    // Loop through each selected file
    for (let i = 0; i < selectedFiles.length; i++) {
      const imageFile = selectedFiles[i];
      const reader = new FileReader();
  
      // Read the file as a data URL
      const promise = new Promise((resolve, reject) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
      });
  
      reader.readAsDataURL(imageFile);
  
      // Wait for the reader to load the file and resolve the promise
      const dataUrl = await promise;
      formData.append("uploaded_images", dataUrl);
    }

    console.log(...formData)
  
    dispatch(postResultatDemandeExamen(formData));
  
    // Continue with your logic here
  };
  
    
    
  */

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  

    // Array to store the image data
    const imgData = [];
    const formData = new FormData()

  
    // Loop through each selected file
    for (let i = 0; i < selectedFiles.length; i++) {
      const imageFile = selectedFiles[i];
      const dataUrl = await readFileAsDataURL(imageFile);
      imgData.push(dataUrl);
     // formData.append("uploaded_images", dataUrl)

      
    }
  
    // Use the imgData array as needed

    //console.log("formData:",imgData)

  
    dispatch(postResultatDemandeExamen(imgData))
    
    // Continue with your logic here
  };
  
  
  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        resolve(reader.result);
      };
  
      reader.onerror = reject;
  
      reader.readAsDataURL(file);
    });
  };
  

  const showImageHandler = (index) => {
    setShowImage(true);
    setCurrentImageIndex(index);
  };

  const cancelImageHandler = () => {
    setShowImage(false);
    setCurrentImageIndex(0);
    setScale(1);
  };

  const imageList = previewUrls.map((url, index) => (
    <div
      key={index}
      style={{ flexBasis: "25%", padding: "10px" }}
      onClick={() => showImageHandler(index)}
    >
      <img
        src={url}
        alt={`preview-${index}`}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  ));

  const deleteImagesHandler = () => {
    setPreviewUrls([]);
    setSelectedFiles([]);
  };

  const zoomInHandler = () => {
    setScale(scale + 0.1);
  };

  const zoomOutHandler = () => {
    setScale(scale - 0.1);
  };

  const numImages = previewUrls.length;
  const numRows = Math.ceil(numImages / 5); // Assuming 5 images per row
  const containerHeight = `${numRows * 100}px`; // Set height based on number of rows
  
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Detections du cancer des seins

        </Typography>

 

          <Card>
            <CardContent>
            <form >

                <input type="file" multiple onChange={handleFileInput} />
              </form>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  marginTop: "10px",
                  height: {containerHeight},
                }}
              >
                {imageList}
              </div>
              {showImage && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1000,
                    backgroundColor: "rgba(0,0,0,0.6)",
                    display: "flex",
                    height: {containerHeight} ,
                    alignItems: "center",
                    justifyContent: "center",
                  
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "60px",
                      objectFit: "contain",
                      transform: `scale(${scale})`,
                      transition: "transform 0.1s linear",
                    }}
                  >
                    

                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Button onClick={cancelImageHandler}  sx={{ mr: 1 }}>
                        <Typography variant="h4" sx={{ fontWeight: "bold" }} color="error">
                          &#x2715;
                        </Typography>
                      </Button>
                      <Button onClick={zoomInHandler} sx={{ mr: 1 }}>
                        <Typography variant="h4" sx={{ fontWeight: "bold" }} color="error">
                          +
                        </Typography>
                      </Button>
                      <Button onClick={zoomOutHandler}>
                        <Typography variant="h4" sx={{ fontWeight: "bold" }} color="error">
                          -
                        </Typography>
                      </Button>
                    </div>
                    <img
                      src={previewUrls[currentImageIndex]}
                      alt={`preview-${currentImageIndex}`}
                      
                    />
                  </div>
                </div>
              )}

              {previewUrls.length > 0 && (
                <div style={{display: "flex"}}>
                <Button variant="contained" color="secondary" onClick={deleteImagesHandler}>
                  Suprimer
                </Button>
                <div>&nbsp;</div>
                <Button type="submit" variant="contained" color="error" onClick= {handleFormSubmit}>
                  Lancer l'analyse
                </Button>
              </div>
              )}
            </CardContent>
          </Card>

        


     
      </Container>
    </>
  );
}

