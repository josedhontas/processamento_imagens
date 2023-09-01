import React, { useEffect, useState } from 'react';
import Select from '@mui/material/Select';
import { Container, Grid, Paper, MenuItem, Button } from '@mui/material';
import axios from 'axios';

interface ImageData {
  image_id: number;
  image_url: string;
}

const Operations = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [selectedImage, setSelectedImage] = useState("https://image-api.josedhonatas.ninja/images/1");
  const [listimages, setListimages] = useState(['1', '2', '3', '4']);
  const [filterimages, setFilterimages] = useState(['negative', 'thresh', 'gray', 'histeq', 'blur'])

  useEffect(() => {
    getImages();
  }, []);

  const getImages = () => {
    axios
      .get("https://image-api.josedhonatas.ninja/images/all")
      .then((res) => {
        setImages(res.data);
      })
      .catch((err) => console.log(err));
  };


  return (
    <Container>
      <Select label="Image">
        {listimages.map((item, i) => (
          <MenuItem value={item}>{item}</MenuItem>
        ))}
      </Select>
      <Select label="Image">
        {filterimages.map((item, i) => (
          <MenuItem value={item}>{item}</MenuItem>
        ))}
      </Select>
      {selectedImage && (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper>
              <img src={selectedImage} alt="Original" style={{ width: '100%' }} />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>
              <img alt="Filtrada" />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained">Aplicar Filtro</Button>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Operations;
