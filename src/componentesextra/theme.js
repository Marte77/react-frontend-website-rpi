import { createTheme } from '@material-ui/core/styles'
import { 
    lightBlue, 
    pink, 
    red, 
    indigo 
    //green, 
    //blue,
    //yellow, 
    //black,  
    //brown, 
    //grey, 
    //lightGreen, 
    //purple 
} from '@material-ui/core/colors'

let tema = createTheme({
    palette:{
        primary:{
            main:pink['A400'],
        },
        secondary:{
            main:red['A700'],
            //contrastText: pink['A400'],
        },
        azulclaro:{
            main:lightBlue['A200']
        },
        verde:{
            main:'#008c3a'
        },
        indigo:{
            main:indigo['500']
        }
    }
})

export default tema