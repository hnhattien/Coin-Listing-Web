
import Sider from 'antd/lib/layout/Sider'
import React, {useState} from 'react'
import styled from 'styled-components';
import Navigation from './Navigation'; 
import media from '../responsive/media';
const Div = styled.div`
    position: fixed;
    box-shadow: 5px 5px 10px rgb(0 0 0 / 7%);
    padding-right: 10px;
    padding-left: 10px;
    @media ${media.sm}{
       
       width: 100%;
       height: 200px;

    }
    
    @media ${media.lg}{
        top: 0;
        width: 270px;
        height: 100vh;
    } 

`
function Navbar(props) {
    return (
        <Div className="bg-gray-1">
            <Sider width={"100%"}>
                
                <h4>Casper Projects</h4>
                
                <Navigation>
                    
                </Navigation>
                
            </Sider>
        </Div>
        
    )
}

export default Navbar;