import logo from './logo.svg';
import './App.css';
import './custom/antd-custom.css';
import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import CoinDetailPage from './pages/CoinDetailPage';
import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`
  body.dark{
    background-color: ${props => props.theme.bg} !important;
    color: white !important;
  }
  body.dark .ant-layout{
    background-color: ${props => props.theme.bg} !important;
    background: ${props => props.theme.bg} !important;
  }
  body.dark .ant-layout-footer{
    background-color: ${props => props.theme.bg} !important;
    background: ${props => props.theme.bg} !important;
  }
  body.dark .ant-layout-content{
    background-color: ${props => props.theme.bg} !important;
  }
  h1,h2,h3,h4,h5,h6{
    color: ${props => props.theme.font.color} !important;
  }
`
function App() {
  const formatCoinPrice = (price, decimal = 18) => {
    const standarPrice = Intl.NumberFormat("en-US",
    {currency: "USD", style: "currency", maximumFractionDigits: decimal}).format(price);
    if(Number(price) < 0.000000001){
      return `< $0.000000001`;
    }
    return standarPrice;
  }
  const formatFullFractionPrice = (price, decimal = 18) => {
    return Intl.NumberFormat("en-US",
    {currency: "USD", style: "currency", maximumFractionDigits: decimal}).format(price);
  }
  return (
    <div>
      <GlobalStyle />
       <Routes>
                <Route path={"/"} element={<HomePage formatFullFractionPrice={formatFullFractionPrice} formatCoinPrice={formatCoinPrice}></HomePage>}>

                </Route>
                <Route path={"/coin/:slug"} element={<CoinDetailPage formatFullFractionPrice={formatFullFractionPrice} formatCoinPrice={formatCoinPrice}></CoinDetailPage>}></Route>
       </Routes>
            
    </div>
  );
}

export default App;
