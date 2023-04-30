import React, { useState } from "react";
import { Helmet } from 'react-helmet-async';
import { Container, Typography, Grid } from '@mui/material';
import { Card, CardContent, CardMedia, Button, TextField } from "@mui/material";

// components

// sections


// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  // eslint-disable-next-line

  const [input1Value, setInput1Value] = useState("");
  const [input2Value, setInput2Value] = useState("");
  const [submitValue, setSubmitValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // do something with the submitted value
  }

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
          <Grid item xs={12} md={6}>
            <Card>
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Title for Image 1
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                image="https://source.unsplash.com/random/800x600"
                alt="Random image"
              />

            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Title for Image 1
                </Typography>
              </CardContent>

              <CardMedia
                component="img"
                image="https://source.unsplash.com/random/800x600"
                alt="Random image"
              />

            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Third Grid Item
                </Typography>
                <TextField
                  label="Input 1"
                  fullWidth
                  value={input1Value}
                  onChange={(e) => setInput1Value(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Third Grid Item
                </Typography>
                <TextField
                  label="Input 2"
                  fullWidth
                  value={input2Value}
                  onChange={(e) => setInput2Value(e.target.value)}
                  sx={{ mb: 2 }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Fourth Grid Item
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Submit Value"
                    fullWidth
                    value={submitValue}
                    onChange={(e) => setSubmitValue(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <br></br>
                  <br></br>
                  <br></br>
                  <Button type="submit" variant="contained" color="primary">
                    Submit
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
