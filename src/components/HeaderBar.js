import { Header } from 'antd/lib/layout/layout'
import React from 'react'
import styled from 'styled-components';
const Div = styled.div`
    max-height: 100px;
    height: 4rem;
    box-shadow: rgb(0 0 0 / 7%) 0px 5px 10px;
`
function HeaderBar(props) {
    return (
        
        <Header>
            <Div className="bg-gray-1" >
                
            </Div>        

        </Header>
        
    )
}

export default HeaderBar;