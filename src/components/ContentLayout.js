import React, { useState } from 'react'
import { Layout } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import FooterBar from './FooterBar';
import HeaderBar from './HeaderBar';
import styled from 'styled-components';
import media from '../responsive/media';
const {Content} = Layout;
const StyledLayout = styled.div`
@media ${media.xxs}{
    margin-left: 0 !important;
}
@media ${media.lg}{
    margin-left: 270px !important;
}
`
export default function ContentLayout(props) {

    return (
        <StyledLayout>
        <Layout id="content-layout" >
          <Header style={{background: "unset", padding: "0", lineHeight: "initial"}}>
            <HeaderBar />
          </Header>
          <Content>
           {props.children}
          </Content>
          <FooterBar/>
        </Layout>
        </StyledLayout>
    )
}
