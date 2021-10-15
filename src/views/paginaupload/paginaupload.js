import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import tema from '../../componentesextra/theme'
import { styled } from '@material-ui/core/styles';
import { ThemeProvider } from '@emotion/react';
import { Button, ImageList,ImageListItem } from '@material-ui/core';
import { Image } from '@material-ui/icons'
import axios from 'axios'
const Input = styled('input')({
    display: 'none',
});

class PaginaUpload extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            btnProps:{
                variant:"outlined",  
                component:"span",
                color:"primary",
                texto:"Escolher Imagem"
            },
            imagens: null,
            username: "martinho",
            password: "martinho"
        }
    }

    previewImg = () =>{
        if(this.state.imagens !== null)
            return this.state.imagens.map((img) => {

                return (<ImageListItem key ={img.name+img.fileSize}>
                    <img
                        alt={img.name}
                        src={URL.createObjectURL(img)}
                    ></img>
                </ImageListItem>)
        })

    }

    handleFileInputOnChange = (e) =>{
        e.preventDefault()
        let newProps = this.state.btnProps
        newProps.texto = this.state.btnProps.texto + ' - ' + e.target.files.length + ' img(s) carregada(s)'
        //if(e.target.files.length >1){
        //    
        //    newProps.color = "error"
        //    newProps.texto = "Erro - só 1 imagem"
        //    this.setState({btnProps:newProps})
        //    return;
        //}
        //console.log(e.target.files[0])
        let imagemArray = []
        //imagemArray.push(e.target.files[0])
        for(let imagem of e.target.files){
            imagemArray.push(imagem)
        }
        
        this.setState({imagens: imagemArray,btnProps:newProps})
        
    }

    handleImgUpload = (e) =>{
        e.preventDefault();
        if(this.state.imagens === null || this.state.imagens.length ===0 ){
            alert("sem imagens carregadas")
            return;
        }
        let img = new FormData()
        img.append('username',localStorage.getItem("username"))
        img.append('password',this.state.password)
        for(let imagem of this.state.imagens)
            img.append('images',imagem)
        //img.append('image',this.state.imagens[0])
        let reqOptions = {
            url: "http://martinho.dynip.sapo.pt:1024/imagens/uploadBulkImg",
            method: "POST",
            headers: {"x-access-token":localStorage.getItem("jwt")},
            data: img,
        }

        axios.request(reqOptions)
        .then(res => {console.log(res);alert(res.statusText + " " + res.data.success )})
        .catch(err => {
            console.log(err)
            alert("L nerd erro: "+ err.response.statusText)
        }
        )
    }

    render(){
        return(
            <ThemeProvider theme={tema} >
                <label htmlFor="input">
                    <Input onChange={this.handleFileInputOnChange} accept="image/*" id="input" multiple type="file" />
                    <Button {...this.state.btnProps}  >
                        <Image/>
                        {this.state.btnProps.texto}
                    </Button>
                </label>
                <Button onClick={this.handleImgUpload}>
                    Upload Imagem
                </Button>
                <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                    {
                        this.previewImg()
                    }
                </ImageList>
            </ThemeProvider>
        )
    }

}

export default PaginaUpload

