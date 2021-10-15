import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react'
import { BrowserRouter as  Route , Link} from 'react-router-dom'
import {BrowserView, MobileView} from 'react-device-detect'
import github from '../../images/github/png/GitHub-Mark-Light-120px-plus.png'
import './paginainicial.css'
import twitter from '../../images/twitter/Twitter logo/SVG/Logo white.svg'
import PaginaLogin from '../paginalogin/paginalogin'
import Button from '@material-ui/core/Button'
import { ThemeProvider } from '@emotion/react';
import axios from 'axios'
import tema from '../../componentesextra/theme'


class PaginaInicial extends React.Component{
    
    botaoOnclick = (e) => { 
        e.preventDefault()
        console.log('yo')
        
        axios.get('http://martinho.dynip.sapo.pt:1024/').then(res => {
            console.log(res);
        })
        .catch(err =>{ 
            console.log(err);
        })
    }


    websiteTopBar(){
        return (
            <>
                
                <nav className="navbar navbar-dark bg-dark ">
                    <div className="position-relative top-0 start-50 translate-middle-x">
                        <Button>
                            <a  href="https://twitter.com/Ilikeverypeidos" rel="noreferrer" target="_blank">
                                <img src={twitter} alt="twitter" width="48px" height="48px"></img>
                            </a>
                        </Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button>
                            <a  href="https://github.com/Marte77" rel="noreferrer" target="_blank"> 
                                <img src={github} alt="Github" width="48px" height="48px"></img>
                            </a>
                        </Button>
                    </div>
                </nav>
                
                <h1 id="ler" style={{textAlign:'center'}}>quem ler isto é gay</h1>
                
                {
                    this.state.isBotaoDefined ? <Button color="azulclaro" variant="contained" onClick={this.abrirPagLogin}>L</Button> : ""
                }
            </>
        )
    }
    websiteBody(){
        if(localStorage.getItem("jwt"))
            return(<>
                <h1>{this.state.temperatura}</h1>
                <Button variant='contained' color="primary" onTouchEnd={this.mudartemp} onClick={this.mudartemp}>add</Button>
                <Button variant='contained' color="primary" onTouchEnd={this.botaoOnclick} onClick={this.botaoOnclick}>teste</Button>
                <Link to="/upload" style={{color:'white'}}>
                    <Button variant='contained' color="indigo">
                        Upload
                    </Button>
                </Link>
                <Link to="/lista_imagens" style={{color:'white'}}>
                    <Button variant='contained' color="indigo">
                        Lista de Imagens 
                    </Button>
                </Link>
                </>)
        else
            return(
                <>
                    <h1>{this.state.temperatura}</h1>
                    <Button variant='contained' color="primary" onTouchEnd={this.mudartemp} onClick={this.mudartemp}>add</Button>
                    <Button variant='contained' color="primary" onTouchEnd={this.botaoOnclick} onClick={this.botaoOnclick}>teste</Button>
                </>
            )
    }


    
    
    mudartemp(e){
        e.preventDefault()
        let x = this.state.temperatura.valueOf();
        x++
        console.warn(x)
        this.setState({temperatura:x})
        console.log(this.state)
    }
    

    constructor(props){
        super(props)
        this.state = {
            isBotaoDefined:false,
            isPressed:false,
            pressCallbackTimeout:500,
            startTimeout:300,
            temperatura:0,
            isLoggedIn:false
        }
        if(localStorage.getItem)
        
    
        this.getTemperatura = this.getTemperatura.bind(this)
        this.handleOnCopy = this.handleOnCopy.bind(this)
        this.longpress = this.longpress.bind(this)
        this.onPointerDown = this.onPointerDown.bind(this)
        this.onPointerUp = this.onPointerUp.bind(this)
        this.adicionarBotao = this.adicionarBotao.bind(this)
        this.mudartemp = this.mudartemp.bind(this)
        this.websiteBody = this.websiteBody.bind(this)
        this.websiteTopBar = this.websiteTopBar.bind(this)


        this.isPressed = false
        this.divBrowser=[]
        /*
        this.divBrowser.push(
        <div id="divIniBrowser" onCopy={this.handleOnCopy} className="divinicial">
            {
            //<nav className="navbar navbar-dark bg-dark ">
            //    <div className="position-relative top-0 start-50 translate-middle-x">
            //        <a  href="https://twitter.com/Ilikeverypeidos" rel="noreferrer" target="_blank">
            //            <img src={twitter} alt="twitter" width="48px" height="48px"></img>
            //        </a>
            //        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            //        <a  href="https://github.com/Marte77" rel="noreferrer" target="_blank"> 
            //            <img src={github} alt="Github" width="48px" height="48px"></img>
            //        </a>
            //    </div>
            //</nav>
            //<h1 id="ler" style={{textAlign:'center'}}>quem ler isto é gay</h1>
            //this.websiteBody()
            }
        </div>)
        
        this.divMobile.push(
            <div id="divIniMobile"
                onTouchStart={this.onPointerDown}
                onTouchEnd={this.onPointerUp}
                className="divinicial">
                {//
                //<nav className="navbar navbar-dark bg-dark ">
                //    <div className="position-relative top-0 start-50 translate-middle-x">
                //        <a  href="https://twitter.com/Ilikeverypeidos" rel="noreferrer" target="_blank">
                //            <img src={twitter} alt="twitter" width="48px" height="48px"></img>
                //        </a>
                //        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                //        <a  href="https://github.com/Marte77" rel="noreferrer" target="_blank"> 
                //            <img src={github} alt="Github" width="48px" height="48px"></img>
                //        </a>
                //    </div>
                //</nav>
                //<h1 id="ler" style={{textAlign:'center'}}>quem ler isto é gay</h1>
                //this.websiteBody()
                }
            </div>)*/
        this.divTemperatura=[]
        this.divTemperatura.push(
            <div id="temperaturaRPi4">
                <p>TemperaturaRPi:fazer api para ir buscar a temperatura ao backend, nao funciona no frontend{/*this.state.temperatura*/}</p>
            </div>)
            this.divMobile=[]
    }
    getTemperatura(){
        //try{
        //temperatura.measure((err,temp)=>{
        //    if(err) {
        //        console.log(err)
        //        return 0;
        //    }
        //    else {
        //        this.setState({temperatura:temp})
        //    }
        //})}catch(e){console.log(e)}
        
    }
    longpress = ()=>{
        
        if(this.isPressed)
            this.adicionarBotao()
    }
    onPointerDown = (e) =>{
        e.preventDefault()
        this.isPressed=true
        setTimeout(this.longpress,1000)
        
    }
    onPointerUp = (e)=>{
        e.preventDefault()
        this.isPressed=false
    }
    adicionarBotao(){
        if(this.state.isBotaoDefined === true)
            return;
        
        let botao =  <button className="btn btn-info" onClick={this.abrirPagLogin}>L</button>
        this.divMobile.push(botao)
        this.setState({isBotaoDefined:true})

    }

    handleOnCopy(e){
        e.preventDefault();
        if(this.state.isBotaoDefined === true)
            return;        

        let botao = 
            <button className="btn btn-info" onClick={this.abrirPagLogin}>L</button>
        
        this.divBrowser.push(botao)
        
        this.setState({isBotaoDefined:true})
    }
    abrirPagLogin = () =>{
        window.open(this.props.location.pathname+"login","_self")
    }
    
    componentDidMount(){
        //setInterval(this.getTemperatura,1000)
    }

    
    //todo: fazer login
    /**
     * 
     * retorna browserview que tem listener onCopy para abrir botao de login
     * retorna mobileview que tem listener de longpress para abrir botao de login
     *
     */
    render(){
        return (
        <ThemeProvider theme={tema}>
            <BrowserView id="browserView">
                <div id="divIniBrowser" onCopy={this.handleOnCopy} className="divinicial">
                    {this.websiteTopBar()}
                </div>
                {this.websiteBody()}
            </BrowserView>
            <MobileView>
                <div id="divIniMobile"
                        onTouchStart={this.onPointerDown}
                        onTouchEnd={this.onPointerUp}
                        className="divinicial">
                    {this.websiteTopBar()}
                </div>
                {this.websiteBody()}
            </MobileView>
            
            {this.divTemperatura}
            <Route path="/login" exact component={PaginaLogin}/>
            <Link to="/webgl" style={{color:'white'}}>
                <Button variant='contained' color="verde">
                    WebGL (nao funciona 😭)
                </Button>
            </Link>
        </ThemeProvider>
        
        )
    }
}
/*

<MobileView>
        <div id="divIni" 
            onTouchStart={this.handleButtonPress} 
            onTouchEnd={this.handleButtonRelease}  
            className="divinicial">
            <nav className="navbar navbar-dark bg-dark ">
                <div className="position-relative top-0 start-50 translate-middle-x">
                    <a  href="https://twitter.com/Ilikeverypeidos" rel="noreferrer" target="_blank">
                        <img src={twitter} alt="twitter" width="48px" height="48px"></img>
                    </a>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a  href="https://github.com/Marte77" rel="noreferrer" target="_blank"> 
                        <img src={github} alt="Github" width="48px" height="48px"></img>
                    </a>
                </div>
            </nav>
            <h1 id="ler" style={{textAlign:'center'}}>quem ler isto é gay</h1>
        </div>
        </MobileView>

*/
export default PaginaInicial