import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import reportWebVitals from './reportWebVitals';
import FooterBar from './components/FooterBar';
import HeaderBar from './components/HeaderBar';
import Navbar from './components/Navbar';
import { Layout } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
const {Content} = Layout;
ReactDOM.render(
  <React.StrictMode>
    <>
    <Router>
    <Layout>
        
        <Layout>
          <HeaderBar />
          <Content>
            <App/>
          </Content>
        </Layout>
        <Navbar></Navbar>
        <Layout>

           <FooterBar/>

        </Layout>
    </Layout>
    </Router>
    </>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
