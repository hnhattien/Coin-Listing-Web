import React, { useState } from 'react'
import Sider from 'antd/lib/layout/Sider';
import Navbar from './Navbar';
import media, {viewport} from '../responsive/media';
import { FaTimes } from 'react-icons/fa';
import styled from 'styled-components';
const StyledLayout = styled.div`
z-index: 2000;
background-color: ${props => props.theme.bg};
color: ${props => props.theme.font.color};
@media ${media.xxs}{
    transition: transform 200ms ease-in-out;
    transform: scaleY(0);
    &.show{
        transform: scaleY(1);
    }
    #navbar-layout{ 
        background-color: ${props => props.theme.blockBg};
        color: ${props => props.theme.font.color};
        overflow: scroll !important;
      
        height: 100vh; 
        position: fixed; 
        left: 0px; 
        flex: 0 0 100% !important; 
        max-width: 100% !important; 
        min-width: 100% !important; 
        width: 100% !important;
       }
       
      
}
@media ${media.lg}{
   transform: none;
   #navbar-layout{ 
     z-index: 1000;
    overflow: unset !important;
 
    height: 100vh; 
    position: fixed; 
    left: 0px; 
    flex: 0 0 270px !important; 
    max-width: 270px !important; 
    min-width: 270px !important; 
    width: 270px !important;
   }
   .exit-navbar-mobile-button{
       display: none;
   }
}
`

const ExitMobileNavbarButton = styled.span`
    position: absolute;
    top: 0;
    right: 20px;
    z-index: 5000;
    cursor: pointer;
`

export default function NavBarLayout(props) {
    return (
        <StyledLayout id="navbar-wrap">
            <ExitMobileNavbarButton 
            onClick={(ev) => {document.querySelector("#navbar-wrap").classList.remove("show")}} className="exit-navbar-mobile-button">
                <FaTimes size={35}></FaTimes>
            </ExitMobileNavbarButton>
            <Sider style={{
            overflowY: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }} width={"270px"}> 
           <Navbar />
        </Sider>
        </StyledLayout>
    )
}
