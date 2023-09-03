import React, { useEffect, useState } from 'react';
import Select from '@mui/material/Select';
import { Container, Grid, Paper, MenuItem, Button, FormControl, InputLabel, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const Operations = () => {
  const [selectedImage, setSelectedImage] = useState("https://image-api.josedhonatas.ninja/images/lenna");
  const [imageName, setimageName] = useState('lenna');
  const [listimages, setListimages] = useState(['lenna', 'lenna_gray']);
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(['negative', 'thresh', 'gray', 'histeq', 'blur'])
  const [filteredImage, setFilteredImage] = useState("https://image-api.josedhonatas.ninja/images/lenna")

  useEffect(() => {
    getImages();
  }, []);

  const applyFilter = () => {
    if (filter) {
      //setLoading(true);
      fetch(`https://image-api.josedhonatas.ninja/images/${filter}/${imageName}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Não foi possível obter a imagem.');
          }
          return response.blob(); // Converte a resposta em um blob
        })
        .then((blob) => {
          const dataUrl = URL.createObjectURL(blob);
          setFilteredImage(dataUrl); 
          setLoading(false);
        })
        .catch((error) => {
          console.error('Erro ao obter a imagem:', error);
          setLoading(false); 
        });
    } else {
      console.log('Por favor, selecione um filtro antes de aplicar.');
    }
  };

  const getImages = () => {
    // Coloque aqui a lógica para buscar as imagens originais, se necessário
  };
  
  useEffect(() => {
    setSelectedImage(`https://image-api.josedhonatas.ninja/images/${imageName}`);
    setFilteredImage(`https://image-api.josedhonatas.ninja/images/${imageName}`);
    setFilter('')
  }, [imageName]);
  

  return (
    <Container>
      <br></br>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Image</InputLabel>
            <Select value={imageName} onChange={e => setimageName(e.target.value)} label="Image">
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

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <Typography variant="h6" align="center"> Original</Typography>
          <Paper elevation={3}>
            <img src={selectedImage} alt="Original" style={{ width: '80%' }} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Typography variant="h6" align='center'>Filtered</Typography>
          <Paper elevation={3}>
            {loading ? (
              <CircularProgress />
            ) : (
              <img src={filteredImage} style={{ width: '80%' }} alt="Filtered" />
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Operations;
