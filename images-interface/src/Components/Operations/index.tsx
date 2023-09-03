import React, { useEffect, useState } from 'react';
import Select from '@mui/material/Select';
import { Container, Grid, Paper, MenuItem, Button, FormControl, InputLabel, Typography } from '@mui/material';
import axios from 'axios';

interface ImageData {
  image_id: number;
  image_url: string;
}

const Operations = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [selectedImage, setSelectedImage] = useState("https://image-api.josedhonatas.ninja/images/1");
  const [idImage, setIdImage] = useState('1');
  const [listimages, setListimages] = useState(['1', '2', '3', '4']);
  const [filter, setFilter] = useState('')
  const [filters, setFilters] = useState(['negative', 'thresh', 'gray', 'histeq', 'blur'])
  const [filteredImage, setFilteredImage] = useState("https://image-api.josedhonatas.ninja/images/1")

  useEffect(() => {
    getImages();
  }, []);

  const applyFilter = () => {
    if (filter) {
      setFilteredImage(`https://image-api.josedhonatas.ninja/images/${filter}/${idImage}`);
    } else {
      console.log('Por favor, selecione um filtro antes de aplicar.');
    }
  };

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  useEffect(() => {
    setSelectedImage(`https://image-api.josedhonatas.ninja/images/${idImage}`);
    setFilteredImage(`https://image-api.josedhonatas.ninja/images/${idImage}`);
  }, [idImage]);


  const getImages = () => {
    axios
      .get("https://image-api.josedhonatas.ninja/images/all")
      .then((res) => {
        setImages(res.data);
      })
      .catch((err) => console.log(err));
  };



  console.log(filteredImage)




  return (
    <Container>
      <br></br>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Image</InputLabel>
            <Select value={idImage} onChange={e => setIdImage(e.target.value)} label="Image">
              {listimages.map((item, i) => (
                <MenuItem value={item} key={i}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Filter</InputLabel>
            <Select value={filter} onChange={e => setFilter(e.target.value)} label="filter">
              {filters.map((item, i) => (
                <MenuItem value={item} key={i}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <Button variant="contained" onClick={applyFilter} size="large" >Apply Filter</Button>
          </FormControl>
        </Grid>
      </Grid>
      <br></br>

      {selectedImage && (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h6" align="center"> Original</Typography>
            <Paper elevation={3}>
              <img src={selectedImage} alt="Original" style={{ width: '80%' }} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h6" align='center'>Filtered</Typography>
            <Paper elevation = {3}>
              <img src={filteredImage} style={{ width: '80%' }} alt="Filtered" />
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Operations;