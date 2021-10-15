import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter , Route  } from 'react-router-dom'
import PaginaInicial from './views/paginainicial/paginainicial'
import PaginaLogin from './views/paginalogin/paginalogin'
import PaginaUpload from './views/paginaupload/paginaupload'
import PaginaListaImagens from './views/paginalistaimagens/paginalistaimagens'
import webGL from './views/webgl/webgl'
function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={PaginaInicial}/>
      <Route path="/login" exact component={PaginaLogin}/>
      <Route path="/webgl" exact component={webGL}/>
      <Route path="/upload" exact component={PaginaUpload}/>
      <Route path="/lista_imagens" exact component={PaginaListaImagens}/>
    </BrowserRouter>
  );
}

export default App;
