import React, { useEffect, useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Container, Grid, Box, Paper, MenuItem, Button } from '@mui/material';
import axios from 'axios'

const Operations = () => {
    const [images, setImages] = useState([])

    useEffect(()=> {
        getImages();
    }, []);

    const getImages = () => {
        axios
        .get("https://image-api.josedhonatas.ninja/images/all")
        .then((res) => setImages(res.data))
        .catch((err) => console.log(err))
    }
    console.log(images)
    return (
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Paper>
                {/* Exiba a imagem original aqui */}
                <img  alt="Original" />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper>
                {/* Exiba a imagem filtrada aqui */}
                <img  alt="Filtrada" />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Select
              >
                {/* Opções de filtro no dropdown */}
                <MenuItem value="">Nenhum</MenuItem>
                <MenuItem value="filtro1">Filtro 1</MenuItem>
                <MenuItem value="filtro2">Filtro 2</MenuItem>
              </Select>
              <Button variant="contained" >Aplicar Filtro</Button>
            </Grid>
          </Grid>
        </Container>
      );
    }

export default Operations;