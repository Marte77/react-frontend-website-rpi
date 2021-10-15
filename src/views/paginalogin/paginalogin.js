import React from 'react'
import{ Button, TextField }from '@material-ui/core/'
import { ThemeProvider } from '@emotion/react';
import tema from '../../componentesextra/theme'
import axios from 'axios'
class PaginaLogin extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            password:"",
            username:""
        }
    }
    abrirPagInicial = () =>{
        let stringantiga = this.props.location.pathname
        stringantiga=stringantiga.substring(0,stringantiga.indexOf("login"))
        window.open(stringantiga,"_self")
        
    }

    handleLogin = (e) =>{
        e.preventDefault()

        axios.post(process.env.endereco + process.env.portaAPI + '/utilizadores/login',{
            username:this.state.username,
            password:this.state.password,
        }).then(res=>{
            if(res.data.success){
                localStorage.setItem("jwt",res.data.token)
                localStorage.setItem("username",this.state.username)
            }
            alert(res.data.success)
        })
    }

    render(){
        return(
            <ThemeProvider theme={tema}>
                <Button color="verde" variant="contained">a</Button>
                <Button color="azulclaro" variant="contained" onClick={this.abrirPagInicial}>Pagina Inicial</Button>

                <TextField id="standard-basic" label="username" variant="standard" onChange={e=>{
                    e.preventDefault()
                    this.setState({username:e.target.value})
                }}/>
                <TextField id="standard-basic" label="password" variant="standard" onChange={e=>{
                    e.preventDefault()
                    this.setState({password:e.target.value})
                }} />
                <Button color="primary" variant="contained" onClick={this.handleLogin}>Login</Button>
            </ThemeProvider>
        )
    }
}

export default PaginaLogin