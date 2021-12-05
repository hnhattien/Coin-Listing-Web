import logo from './logo.svg';
import './App.css';
import './custom/antd-custom.css';
import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import CoinDetailPage from './pages/CoinDetailPage';

function App() {
  return (
    <div>
       <Routes>
                <Route path={"/"} element={<HomePage></HomePage>}>

                </Route>
                <Route path={"/coin/:slug"} element={<CoinDetailPage></CoinDetailPage>}></Route>
            </Routes>
    </div>
  );
}

export default App;
