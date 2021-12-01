import React, { useState } from 'react'
import Sider from 'antd/lib/layout/Sider';
import Navbar from './Navbar';
import media, {viewport} from '../responsive/media';
import styled from 'styled-components';
const StyledLayout = styled.div`
@media ${media.xxs}{
    #navbar-layout{ 
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
}
`
export default function NavBarLayout() {
    
    return (
        <StyledLayout>
            <Sider id="navbar-layout" style={{
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
