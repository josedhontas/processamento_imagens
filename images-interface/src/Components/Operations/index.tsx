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
  const [idImage, setIdImage] = useState('1');
  const [listimages, setListimages] = useState(['1', '2', '3', '4']);
  const [filter, setFilter] = useState('')
  const [filters, setFilters] = useState(['negative', 'thresh', 'gray', 'histeq', 'blur'])
  const [filteredImage, setFilteredImage] = useState("https://image-api.josedhonatas.ninja/images/1")

  useEffect(() => {
    getImages();
  }, []);

  useEffect(() => {
    console.log(filter);
    setFilteredImage(`https://image-api.josedhonatas.ninja/images/${filter}/${idImage}`);
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

  const getFilteredImage = () =>{
    setSelectedImage(`https://image-api.josedhonatas.ninjas/images/${filter}/${idImage}`)
  }

  console.log(filteredImage)




  return (
    <Container>
      <Select value={idImage} onChange={e => setIdImage(e.target.value)} label="Image">
        {listimages.map((item, i) => (
          <MenuItem value={item}>{item}</MenuItem>
        ))}
      </Select>
      <Select value={filter} onChange={e => setFilter(e.target.value)}label="filter">
        {filters.map((item, i) => (
          <MenuItem value={item}>{item}</MenuItem>
        ))}
      </Select>
      {selectedImage && (
        <Grid container spacing={2}>
          <Grid item xs={6}>
          <h2>Original</h2>
            <Paper>
              <img src={selectedImage} alt="Original" style={{ width: '100%' }} />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>
              <img src= {filteredImage} style={{width: '100%'}} alt="Filtrada" />
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
