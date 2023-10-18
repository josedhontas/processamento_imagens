import React, { useEffect, useState } from 'react';
import Select from '@mui/material/Select';
import { Container, Grid, Paper, MenuItem, Button, FormControl, InputLabel, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const Operations = () => {
  const [selectedImage, setSelectedImage] = useState('');
  const [imageName, setimageName] = useState('lenna');
  const [listimages, setListimages] = useState(['lenna', 'lenna_gray', 'prof_daniel']);
  const [imageinfo, setImageInfo] = useState('');
  const [filter, setFilter] = useState('');
  const [loading1, setLoading1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(['negative', 'thresh', 'gray', 'histeq', 'contrast'])
  const [filteredImage, setFilteredImage] = useState('')

  useEffect(() => {
    getImages();
  }, []);

  const applyFilter = () => {
    if (filter) {
      setLoading(true);

      fetch(`https://image-api.josedhonatas.ninja/images/${filter}/${imageName}`)
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
    fetch(`https://image-api.josedhonatas.ninja/images/${imageName}`)
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

      fetch(`https://image-api.josedhonatas.ninja/images/info/${imageName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Não foi possível obter informações sobre a imagem.');
        }
        return response.json();
      })
      .then((data) => {
        setImageInfo(data);
      })
      .catch((error) => {
        console.error('Erro ao obter informações da imagem:', error);
      })
      .finally(() => {
        setLoading(false);
      });
    console.log(imageinfo)
    setFilter('')
  }, [imageName]);

  return (
    <>
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
            {loading1 ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <CircularProgress />
              </div>
            ) : (
              <img src={selectedImage} alt="Original" style={{ width: '75%' }}                 title={`Filtered Image: ${imageName}`} // Título da imagem filtrada
              />
            )}
          </Grid>
          
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h6" align='center'>Filtered</Typography>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <CircularProgress />
              </div>
            ) : (
              <img src={filteredImage} style={{ width: '75%' }} alt="Filtered" />
            )}
          </Grid>
        </Grid>
        <List>
          <ListItem>
            <ListItemText primary={`Name: ${imageName}`} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary={`Channels: ${imageName}`} />
          </ListItem>
          <Divider/>
          <ListItem>
            <ListItemText primary={`Size: ${imageName}`} />
          </ListItem>
        </List>
      </Container>
    </>

  );
};

export default Operations;
