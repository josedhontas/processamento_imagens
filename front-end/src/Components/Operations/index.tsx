import React, { useEffect, useState } from 'react';
import Select from '@mui/material/Select';
import { Container, Grid, Paper, MenuItem, Button, FormControl, InputLabel, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const Operations = () => {
  const [selectedImage, setSelectedImage] = useState('');
  const [imageName, setimageName] = useState('lenna');
  const [listimages, setListimages] = useState(['lenna', 'lenna_gray', 'prof_daniel']);
  const [filter, setFilter] = useState('')
  const [loading1, setLoading1] = useState(false)
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(['negative', 'thresh', 'gray', 'histeq','contrast'])
  const [filteredImage, setFilteredImage] = useState('')

  useEffect(() => {
    getImages();
  }, []);

  const applyFilter = () => {
    if (filter) {
      setLoading(true);

      fetch(`https://image-api.josedhonata.ninja/images/${filter}/${imageName}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Não foi possível obter a imagem.');
          }
          return response.blob();
        })
        .then((blob) => {
          const dataUrl = URL.createObjectURL(blob);
          setFilteredImage(dataUrl);
        })
        .catch((error) => {
          console.error('Erro ao obter a imagem:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.log('Por favor, selecione um filtro antes de aplicar.');
    }
  };

  const getImages = () => {
  };

  useEffect(() => {
    setLoading1(true)
    setLoading(true)
    fetch(`https://image-api.josedhonata.ninja/images/${imageName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Não foi possível obter a imagem.');
        }
        return response.blob();
      })
      .then((blob) => {
        const dataUrl = URL.createObjectURL(blob);
        setSelectedImage(dataUrl)
        setFilteredImage(dataUrl);
      })
      .catch((error) => {
        console.error('Erro ao obter a imagem:', error);
      })
      .finally(() => {
        setLoading1(false)
        setLoading(false);
      });
    setFilter('')
  }, [imageName]);

  return (
    <Container>
      <br></br>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4}>
          <FormControl fullWidth disabled={loading}>
            <InputLabel>Image</InputLabel>
            <Select
              value={imageName}
              onChange={e => setimageName(e.target.value)}
              label="Image">
              {listimages.map((item, i) => (
                <MenuItem value={item} key={i}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth disabled={loading}>
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
            {loading1 ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <CircularProgress />
              </div>
            ) : (
              <img src={selectedImage} alt="Original" style={{ width: '80%' }} />
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Typography variant="h6" align='center'>Filtered</Typography>
          <Paper elevation={3}>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <CircularProgress />
              </div>
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
