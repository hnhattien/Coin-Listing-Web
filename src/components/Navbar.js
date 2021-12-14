
import React, {useState} from 'react'
import styled from 'styled-components';
import Navigation from './Navigation'; 
import media from '../responsive/media';
const Div = styled.div`
    position: fixed;
    box-shadow: 5px 5px 10px rgb(0 0 0 / 7%);
    padding-right: 10px;
    padding-left: 10px;
    @media ${media.xxs}{      
       width: 100%;
    }
    
    @media ${media.lg}{
        top: 0;
        width: 270px;
        height: 100vh;
    } 

`
function Navbar(props) {
    return (
        <Div id="navbar-layout">
            
                
                <h4 style={{marginBottom: 0}}>Casper Projects</h4>
                
                <Navigation>
                    
                </Navigation>
                
           
        </Div>
        
    )
}

export default Navbar;