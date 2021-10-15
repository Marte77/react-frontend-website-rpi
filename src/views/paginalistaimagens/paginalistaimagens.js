import React from 'react'
import{ Button, Modal, IconButton, Grid, Box}from '@material-ui/core/'
import{ DataGrid }from '@material-ui/data-grid'
import { ThemeProvider } from '@emotion/react';
import { ArrowForward, ArrowBack,Close } from '@material-ui/icons'
import tema from '../../componentesextra/theme'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

class PaginaListaImagens extends React.Component{
    constructor(props){
        super(props)
        
        this.state ={
            ficheiros:[],
            rows:[],
            isModalOpen:false,
            pageSize:5,
            previewIMG:null,
            previewIMGdim:{width:0, height:0, ratio:0},
            imagemSelecionada:0,
            rowsPerPage:5,
            colunas : [ 
                { field: 'nome', headerName: 'Nome', width: 500 },
                { field: 'tipo', headerName: 'Tipo', width: 500 },
                { field: 'tamanho', headerName: 'Tamanho (MB)', width: 200 },
                { field: '', headerName: '', width: 110,
                    renderCell: this.renderGridButton
                    },
                //{ field: 'id', headerName: 'ID Ficheiro', width: 200 },
            ],
        }
        
    }

    obterImagen = (nomeimagem,tipoficheiro) =>{
        let headersList = {
            "x-access-token": localStorage.getItem("jwt")
        }
        let reqOptions = {
            url: process.env.endereco + process.env.portaAPI + "/imagens/"+ nomeimagem,
            method: "GET",
            headers: headersList,
            responseType: 'arraybuffer'
            
        }
        
        axios.request(reqOptions)
        .then(res=>{
            let arraybuf = res.data
            let mimetype = {type:'image/'+tipoficheiro}
            let data = Buffer.from(arraybuf, 'binary').toString('base64')
            data = "data:"+mimetype.type+";base64,"+ data
            let img = new Image()
            img.src = data
            img.onload = () => {
                let a = this.state.previewIMGdim
                a.width = img.width
                a.height = img.height
                a.ratio = img.width / img.height
                this.setState({previewIMGdim:a})
            }
            this.setState({previewIMG:data, isModalOpen:true})
        }).catch(err=>{
            console.log(err)
        })
    }

    gridButtonOnClick = (e) =>{
        e.preventDefault()
        let id = parseInt(e.target.attributes["id"].value)
        let ficheirofinal

        for(let ficheiro of this.state.ficheiros){
            
            if(ficheiro.id_ficheiro === id){
                ficheirofinal = ficheiro
                break;
            }
        }
        this.setState({imagemSelecionada:id})
        this.obterImagen(ficheirofinal.nome_ficheiro,ficheirofinal.tipo_ficheiro.split(".")[1])
        
        //axios.request(reqOptions)
        //.then(res=>{
        //    let mimetype = {type:'image/'+ficheirofinal.tipo_ficheiro.split(".")[1]}
        //    let img = document.getElementById("imagempreview")
        //    let stringdata = res.data
        //    
        //    stringdata = "data:"+mimetype.type+";base64,"+stringdata
        //    this.setState({previewIMG:stringdata})
        //    console.log(res)
        //})
        //.catch(err=>{
        //    console.log(err)
        //})
    }


    renderGridButton = (params) =>{
        return (
            <Button color="primary" id={params.id} variant="contained" onClick={this.gridButtonOnClick}>
                Preview
            </Button>
        )
    }

    componentDidMount(){
        let url = process.env.endereco + process.env.portaAPI + "/imagens/lista_imagens/" + localStorage.getItem("username")
        axios.get(url).then(res=>{
            //console.log(res)
            let fichs = res.data.ficheiros
            let rows = []
            for(let ficheiro of fichs){
                rows.push({
                    id:ficheiro.id_ficheiro,
                    nome:ficheiro.nome_ficheiro,
                    tipo:ficheiro.tipo_ficheiro,
                    tamanho:Number.parseFloat(ficheiro.tamanho_em_mb).toFixed(2),
                })
            }
            this.setState({rows:rows, ficheiros:fichs})
            //console.log(this.state)
        }).catch(err=>{
            console.log(err.response)
            alert("L nerd erro: " + err.response.data.err)
        })
    }

    render(){
        return(
            <ThemeProvider theme={tema}>
                <Button variant="contained" color="secondary">yo</Button>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid 
                        columns = {this.state.colunas}
                        rows={this.state.rows}
                        pageSize={5}
                        rowsPerPageOptions = {[5]}
                    />
                </div>
                {/*style={{display: "grid",height: "100%"}}*/}
                <Modal
                    onClick={this.handleModalOnClick}
                    open={this.state.isModalOpen}
                    onClose={this.handleModalClose}
                    aria-labelledby="preview imagem"
                    aria-describedby="preview imagem"
                    style={{display: "grid",height: "100%"}}
                    
                >
                    {/*<Box component="span" sx={{margin: "auto",width: "60%"}} >{/*sx={{display: "grid",height: "100%"}}*/}
                    <Box component="span" sx={{margin: "auto",width: "60%"}} >
                        <Grid container spacing={1} direction="row" justifyContent="center" alignItems="center">
                        <IconButton onClick={this.handleModalClose}>
                            <Close/>
                        </IconButton>
                            <Grid item xs="auto">
                                {/*<Button color="primary">Botao1</Button>*/}
                                <IconButton onClick={this.handleBackward}>
                                    <ArrowBack/>
                                </IconButton>
                            </Grid>
                            <Grid item xs="auto">
                                <img className=".img-fluid" width={this.state.previewIMGdim.width*0.5}
                                height={this.state.previewIMGdim.height*0.5/*(this.state.previewIMGdim.width*0.75*this.state.previewIMGdim.ratio)*/}
                                src={this.state.previewIMG}/>

                            </Grid>
                            <Grid item xs="auto">
                                {/*<Button color="primary">Botao3</Button>*/}
                                <IconButton onClick={this.handleForward}>
                                    <ArrowForward/>
                                </IconButton>
                            </Grid>
                                {/*this.state.image ? <img alt="preview"src={this.state.previewIMG}/>: ''*/}
                        </Grid>
                    </Box>
                </Modal>
            </ThemeProvider>
            
        )
    }
    handleModalOnClick = (e) =>{
        e.preventDefault()
        console.log(e)
    }
    handleForward = (e) =>{
        e.preventDefault()
        let id = this.state.imagemSelecionada
        id++
        console.log(this.state.ficheiros[id])
        //this.setState({imagemSelecionada:id})
        //this.obterImagen(this.state.ficheiros[id])
    }
    handleBackward = (e) =>{
        e.preventDefault()
        let id = this.state.imagemSelecionada
        let fich, fichAgr
        for(let i =0; i< this.state.ficheiros.length; i++){
            if(i===0){
                fichAgr = this.state.ficheiros[i]
            }else{
                fichAgr = this.state.ficheiros[i]
                if(fichAgr.id_ficheiro === id){
                    fich = this.state.ficheiros[i--]
                }
            }
        }

        this.setState({imagemSelecionada:fich.id_ficheiro})
        this.obterImagen(fich.nome_ficheiro,fich.tipo_ficheiro.split(".")[1])
    }
    handleModalClose = () =>{
        this.setState({isModalOpen:false})
    }
    

}


/*

<img id="imagempreview" 
style={
    //{width:"40%", height:"100%",display:"block", marginLeft:"auto", marginRight:"auto"}
    
{margin:"auto",maxWidth: '100%', maxHeight:"100%"}}
src={this.state.previewIMG}
alt="preview"></img>

*/

export default PaginaListaImagens