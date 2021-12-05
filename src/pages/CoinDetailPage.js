import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components';
import { NavLink, useParams } from 'react-router-dom';
import { Row, Col } from 'antd';
import API from '../service/API/index';
import { COINGECKO_API_URL } from '../CoinmarketcapAPI/index';
import LineChart from '../components/LineChart';
import appleStock, { AppleStock } from '@visx/mock-data/lib/mocks/appleStock';
import * as d3 from 'd3';



const ChartArea = styled.div`

`


const CoinBrandWrap = styled.div`
.label{
    padding: 10px;
    margin-top: 10px;
    margin-right: 10px;
    border-radius: 10px;
    display: inline-block;
    background: #E40B7B;
    font-weight: 700;
}
.info{
    padding-left: 20px;
}
.logo{
    margin-top: 20px;
}
    .logo img{
        border-radius: 50%;
        
    }
    display: flex;
    .name-wrap{
        display: flex;
        align-items: center;
        h1,h2,h3,h4,h5,h6{
            margin: 0;
        }
        .symbol{
            margin-left: 10px;
            width: 60px;
            height: 30px;
            border-radius: 10%;
            background: #fff;
            text-align: center;
            line-height: 30px;
            text-transform: uppercase;
            background-color: rgba(0,0,0,.05);
            color: #888;
        }
    }
`

const CoinPrice = styled.div`
    .price-wrap{
        display: flex;
        align-items: center;
        .price{
           font-size: 2em;
           margin: 0;
           font-weight: 800;
        }
        .price-change{
            padding: 10px;
            border-radius: 10px;
            color: white;
            font-weight: 800;
            margin-left: 10px;
        }
    }
`

export default function CoinDetailPage() {
    const width = 1000;
    const height = 500;
    const [coinChart, setCoinChart] = useState(null);
    const [coinInfo, setCoinInfo] = useState(null);
    const chartRef = useRef(null);
    const {slug} = useParams();

    const getCoinInfo = () => {
        const url = `${COINGECKO_API_URL}/coins/${slug}`
        const headers = {};
        headers['Accept'] = "application/json";
        headers['Content-Type'] = "application/json";
        const requestInfo = { headers };
        API.get(url, requestInfo).then((res) => {

           if(res.error){
               console.log(res.error.msg);
           }
           else{
               if(typeof res === typeof {}){
                   setCoinInfo(res);
               }
           }
           
        }).catch(err=>{
            console.log(err);
        });
    }
    const getCoinChart = () => {
        const url = `${COINGECKO_API_URL}/coins/${slug}/market_chart`
        let headers = {};
        let params = {};
        params['vs_currency'] = "usd";
        params['days'] = "max";
        params['interval'] = "daily"
        headers['Accept'] = "application/json";
        headers['Content-Type'] = "application/json";
        
        const requestInfo = { headers, params };
        API.get(url, requestInfo).then((res) => {
            if(res.error){
                console.log(res.error.msg);
            }
            else{
                    setCoinChart(res);
              console.log(res);
            }

         }).catch(err=>{
             console.log(err);
         });
    }
    useEffect(() => {
      
        getCoinInfo();
        getCoinChart();
    }, [slug])
    return (
      <div>
            
        {coinInfo && <div style={{padding: "5em"}}>
            {console.log(coinInfo)}
            <Row>
                
            <Col span={19}>
            <CoinBrandWrap>
                     <div className="logo">
                     <img src={coinInfo.image.small}>
                     </img>
                     </div>
                     <div className="info">
                         <div className="name-wrap">
                             <h2 className="name">{coinInfo.name}</h2>
                         <span className="symbol">{coinInfo.symbol}</span>
                         </div>
                         <span className="text-gray-9">{coinInfo.description.en.split(".")[0]}</span>
                         <div>
                             {coinInfo.categories.map((cate, index) => {
                                return <span key={index} className="label text-gray-2">{cate}</span>
                             })}
                         </div>
                     </div>
                </CoinBrandWrap>
            
            </Col>
            <Col span={5}>
                <CoinPrice>
                    <h1>Current price</h1>
                    <div className="price-wrap">
                        <h2 className="price">${coinInfo.market_data['current_price']['usd']}</h2>
                        <span style={{backgroundColor: coinInfo.market_data['price_change_percentage_24h'] < 0 ? "#DC3545" : "#17A2B8" }} className="price-change">${coinInfo.market_data['price_change_percentage_24h']}</span>
                    </div>
                    <div className="wherecanbuy">

                    </div>
                    
                </CoinPrice>
            </Col>
        </Row>
        
        <Row>
            <Col span={15}>
            <ChartArea>
          { coinChart && <LineChart chartData={coinChart}></LineChart>}
            </ChartArea>
            </Col>
            <Col span={9}>
            </Col>
        </Row>
        </div>
    }
      </div>
       
    )
}
