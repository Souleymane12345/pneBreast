



import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { Container, Typography, Grid } from '@mui/material';
import { Card, CardContent, CardMedia, Button, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { baseURL } from "../Redux/axios";


// components

// sections Présence effective d'un cancer au sein de cette mammographie

import { useDispatch, useSelector } from "react-redux";
//import { useNavigate } from 'react-router-dom';

//import { useHistory } from "react-router-dom";
import { getResultatDemandeExamen } from "../Redux/actions/imagerie"


// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  // eslint-disable-next-line
  const dispatch = useDispatch()

  const [input1Value, setInput1Value] = useState("");
  const [input2Value, setInput2Value] = useState("");
  const [input3Value, setInput3Value] = useState("");
  const [submitValue, setSubmitValue] = useState("");


  const params = useParams()

  const imageDefaultValue = (e) => {
    return baseURL + e ;
    
    // do something with the submitted value
  } 

  const params_id = atob(params?.groupId)

  useEffect(() => {
    console.log('data  getResultatDemandeExamen  data :')
    dispatch(getResultatDemandeExamen(params_id))

    //eslint-disable-next-line
  }, [dispatch])



  const handleSubmit = (e) => {
    e.preventDefault();
    // do something with the submitted value
  }

  const data = useSelector((state) => state.imgeriedata.resultatDemandeExamen);

  console.log('data  data  data :', data)

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Diagnostic 
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <Card>
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Image d'origine
                </Typography>

                <Grid container spacing={2}>
                  {data.map((image) => (
                    <Grid item xs={6} sm={3} key={image.id}>
                      { console.log('imageDefaultValue(image.image):',imageDefaultValue(image.image)) }
                      <img src= {imageDefaultValue(image.image)}  alt={`Image ${image.id}`} />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>


            </Card>
          </Grid>

          <Grid item xs={12} md={12}>
            <Card>
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Detection de la zone(s) cancereuse(s)
                </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={3}>
                      <img src="image5.jpg" alt="Image 5" />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <img src="image6.jpg" alt="Image 6" />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <img src="image7.jpg" alt="Image 7" />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <img src="image8.jpg" alt="Image 8" />
                    </Grid>
                  </Grid>
              </CardContent>



            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Prediction de l'intelligence artificielle 
                </Typography>
                <TextField
                  label="Cancer detecté avec une precision de 88%"
                  fullWidth
                  value={input1Value}
                  onChange={(e) => setInput1Value(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Typography variant="h6" sx={{ mb: 2 }}>
                Commentaire de l'intelligence artificielle 
                </Typography>
                <TextField
                  label="Cancer detecter au niveau de la zone centrale "
                  fullWidth
                  value={input3Value}
                  onChange={(e) => setInput3Value(e.target.value)}
                  sx={{ mb: 2 }}
                />
              </CardContent>
              <br></br>
              <br></br>
              <br></br>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Diagnostic du radiologue
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Diagnostic"
                    fullWidth
                    value={submitValue}
                    onChange={(e) => setSubmitValue(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Evaluation de la Prediction de l'intelligence artificielle
                </Typography>

                <TextField
                  label="0/10"
                  fullWidth
                  value={input2Value}
                  onChange={(e) => setInput2Value(e.target.value)}
                  sx={{ mb: 2 }}
                />
                  <Button type="submit" variant="contained" color="primary">
                    Enregistrement du diagnostic
                  </Button>
                  <br></br>
                  <br></br>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}


/** 
import React, { useState } from "react";
import { Helmet } from 'react-helmet-async';
import { Container, Typography, Grid } from '@mui/material';
import { Card, CardContent, CardMedia, Button, TextField } from "@mui/material";
// ----------------------------------------------------------------------

export default function BlogPage() {

  const [input1Value, setInput1Value] = useState("");
  const [input2Value, setInput2Value] = useState("");
  const [input3Value, setInput3Value] = useState("");
  const [submitValue, setSubmitValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // do something with the submitted value
  }

  return (
    <>
      <Helmet>
        <title>Dashboard: Blog | Minimal UI</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Examen
        </Typography>
///  {`http://127.0.0.1:8000${image.image}`}

        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <img src="image1.jpg" alt="Image 1" />
              </Grid>
              <Grid item xs={6} sm={3}>
                <img src="image2.jpg" alt="Image 2" />
              </Grid>
              <Grid item xs={6} sm={3}>
                <img src="image3.jpg" alt="Image 3" />
              </Grid>
              <Grid item xs={6} sm={3}>
                <img src="image4.jpg" alt="Image 4" />
              </Grid>
            </Grid>
          </CardContent>

          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <img src="image5.jpg" alt="Image 5" />
              </Grid>
              <Grid item xs={6} sm={3}>
                <img src="image6.jpg" alt="Image 6" />
              </Grid>
              <Grid item xs={6} sm={3}>
                <img src="image7.jpg" alt="Image 7" />
              </Grid>
              <Grid item xs={6} sm={3}>
                <img src="image8.jpg" alt="Image 8" />
              </Grid>
            </Grid>
          </CardContent>

          <CardContent>
        
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
*/