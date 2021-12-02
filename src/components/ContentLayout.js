import React, { useState } from 'react'
import { Layout } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import FooterBar from './FooterBar';
import HeaderBar from './HeaderBar';
import styled from 'styled-components';
import media from '../responsive/media';
import {Routes, Route} from 'react-router-dom';
import HomePage from '../pages/HomePage';
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
          <Header>
            <HeaderBar />
          </Header>
          <Content>
            <Routes>
                <Route path={"/"} element={<HomePage></HomePage>}>

                </Route>
            </Routes>
          </Content>
          <FooterBar/>
        </Layout>
        </StyledLayout>
    )
}
