import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'antd/dist/antd.css';
import reportWebVitals from './reportWebVitals';
import { Layout } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBarLayout from './components/NavBarLayout';
import ContentLayout from './components/ContentLayout';
import { store } from './app/store';
import { Provider } from 'react-redux';
import ThemeWrapper from './components/ThemeWrapper';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <Router>
      <ThemeWrapper>
          <Layout>
            <NavBarLayout />
            <ContentLayout>
              <App/>  
            </ContentLayout>
          </Layout>
      </ThemeWrapper>
    </Router>
    </Provider>    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
