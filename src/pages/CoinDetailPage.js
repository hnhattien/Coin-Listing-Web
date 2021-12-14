import React, { useEffect, useState, useRef, useCallback } from 'react'
import styled from 'styled-components';
import { NavLink, useParams } from 'react-router-dom';
import { Row, Col, Tooltip } from 'antd';
import API from '../service/API/index';
import { COINGECKO_API_URL } from '../CoinmarketcapAPI/index';
import LineChart from '../components/LineChart';
import { IoCloudySharp } from 'react-icons/io5';
import { BsFillClockFill } from 'react-icons/bs';
import media from '../responsive/media';
import { GiHighTide } from 'react-icons/gi';
import { GiLowTide } from 'react-icons/gi';
import TopBarProgress from "react-topbar-progress-indicator";
import _ from 'underscore';
const communityKeys = ['github', 'twitter_screen_name', 'homepage', 'telegram_channel_identifier'];
const ChartArea = styled.div`

`
const DescriptionArea = styled.div`
    
`
const MetricArea = styled.div`
    @media ${media.xxs}{
        margin-top: 40px;
    }
    .metric-area{
        margin-bottom: 2em;
    }
`
const MarketCapArea = styled.div`
    background-color: ${props => props.theme.blockBg};
    color: ${props => props.theme.font.color};
    border-radius: 50px;
    padding: 20px;
    .coininfo-title{
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 20px;
    }
    .pinkdot{
        margin-right: 5px;
        border-radius: 100%;
        background-color: #E40B7B;
        width: 20px;
        height: 20px;
        display: inline-block;
    }
    .metric{
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .metricicon{
            margin-right: 10px;
        }
    }

    
`
const TokenAllocation = styled.div`

`

const TokenCirculation = styled.div`
background-color: ${props => props.theme.blockBg};
color: ${props => props.theme.font.color};
    border-radius: 50px;
    padding: 20px;
    .coininfo-title{
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 20px;
    }
    .pinkdot{
        margin-right: 5px;
        border-radius: 100%;
        background-color: #E40B7B;
        width: 20px;
        height: 20px;
        display: inline-block;
    }
    .metric{
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .metricicon{
            margin-right: 10px;
        }
    }
`
const CoinBrandWrap = styled.div`
padding-left: 2em;
.label{
    padding: 10px;
    margin-top: 10px;
    margin-right: 10px;
    border-radius: 10px;
    display: inline-block;
    background: #E40B7B;
    font-weight: 700;
}

.short-description{

  color: ${props => props.theme.font.color};

}

@media ${media.xxs}{
    .label{
        font-size: 10px;
    }
}

@media ${media.lg}{
    .label{
        font-size: 14px;
    }
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
        .name{
        font-weight: 800;
        }
        align-items: center;
        h1,h2,h3,h4,h5,h6{
            margin: 0;
        }
        .symbol{
            margin-left: 10px;
            width: 60px;
            height: 30px;
            border-radius: 5px;
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
           text-overflow: ellipse;
        }
        .price-change{
            padding: 10px;
            border-radius: 10px;
            color: white !important;
            font-weight: 800;
            margin-left: 10px;
        }
    }
`
const CoinDetailPageWrap = styled.div`
color: ${props => props.theme.font.color} !important;
    margin-top: 4em;
    @media ${media.xxs}{
        font-size: 12px;
        h1,h2,h3,h4,h5,h6{
            font-size: 14px !important;
        }
    }

    @media ${media.lg}{
        .inner-wrap{
            padding: "5em"
        }
        font-size: 14px;
        h1,h2,h3,h4,h5,h6{
            font-size: unset !important;
        }
    }
`
export default function CoinDetailPage({formatCoinPrice, formatFullFractionPrice}) {
    const width = 1000;
    const height = 500;
    const [coinChart, setCoinChart] = useState(null);
    const [coinInfo, setCoinInfo] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const {slug} = useParams();
    const formatCurrency = (value) => {       
       return Intl.NumberFormat("en-us", {style: "currency", currency: "USD",maximumFractionDigits: 0}).format(value)
    }
    
    const getCoinInfo = () => {
        setLoading(true);
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
                   setLoading(false);
                   console.log(res);
               }
           }
           
        }).catch(err=>{
            console.log(err);
        });
    }
    const getCoinChart = (days = "1") => {
        setLoading(true);
        const url = `${COINGECKO_API_URL}/coins/${slug}/market_chart`
        let headers = {};
        let params = {};
        params['vs_currency'] = "usd";
        params['days'] = days;
        headers['Accept'] = "application/json";
        headers['Content-Type'] = "application/json";
        
        const requestInfo = { headers, params };
        API.get(url, requestInfo).then((res) => {
            if(res.error){
                console.log(res.error.msg);
            }
            else{
              setCoinChart(res);
              setLoading(false);
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
      <CoinDetailPageWrap>
        {isLoading && <TopBarProgress></TopBarProgress>}
        {coinInfo && <div className="inner-wrap">
            {console.log(coinInfo)}
            <Row>
                
            <Col span={17}>
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
                            <span className="short-description">{coinInfo.description.en.split(".")[0]}</span>
                            <div className="categories">
                                {coinInfo.categories.map((cate, index) => {
                                    return <span key={index} className="label text-gray-2">{cate}</span>
                                })}
                            </div>
                            <div className="community">
                                 
                            </div>
                        </div>
                </CoinBrandWrap>
            
            </Col>
            <Col span={6}>
                <CoinPrice>
                    <h1 style={{fontWeight: "800"}}>Current price</h1>
                    <div className="price-wrap">
                        <Tooltip title={formatFullFractionPrice(coinInfo.market_data['current_price']['usd'])}><h2 className="price">{formatCoinPrice(coinInfo.market_data['current_price']['usd'])}</h2></Tooltip>
                        <span style={{backgroundColor: coinInfo.market_data['price_change_percentage_24h'] < 0 ? "#DC3545" : "#17A2B8" }} className="price-change">${coinInfo.market_data['price_change_percentage_24h']}</span>
                    </div>
                    <div className="wherecanbuy">

                    </div>
                    
                </CoinPrice>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
              
            </Col>
        </Row>
        <Row justify='center' style={{columnGap: "2em", marginTop: "2em", marginBottom: "2em"}}>
            <Col span={20} lg={14} >
            <ChartArea>
          { coinChart && <LineChart getCoinChart={getCoinChart} chartData={coinChart.prices}></LineChart>}
            </ChartArea>
            <DescriptionArea>

            </DescriptionArea>
            </Col>
            
            {coinChart && <Col style={{columnGap: "2em"}} span={20} lg={8}>
                <MetricArea>
                    <MarketCapArea className="metric-area">
                        <h1 className="coininfo-title"><span className="pinkdot"></span>Key Metrics</h1>
                        <div className="metric">
                            <span><span className="metricicon"><IoCloudySharp color={"#E40B7B"}/></span>Market Cap</span>
                            <span>{formatCoinPrice(coinInfo.market_data['market_cap']['usd'])}</span>
                        </div>
                        <div className="metric">
                            <span><span className="metricicon"><BsFillClockFill color={"#E40B7B"}/></span>24H Volume</span>
                            <span>{formatCoinPrice(_.last(_.flatten(coinChart["total_volumes"])))}</span>
                        </div>
                        <div className="metric">
                            <span><span className="metricicon"><GiHighTide color={"#E40B7B"}/></span>All Time High</span>
                            <span>{formatCoinPrice(coinInfo['market_data']['ath']['usd'])}</span>
                        </div>
                        <div className="metric">
                            <span><span className="metricicon"><GiLowTide color={"#E40B7B"}/></span>All Time Low</span>
                            <span>{formatCoinPrice(coinInfo['market_data']['atl']['usd'])}</span>
                        </div>
                    </MarketCapArea>
                    <TokenAllocation className="metric-area">

                    </TokenAllocation>
                    
                    <TokenCirculation className="metric-area">
                    <h1 className="coininfo-title"><span className="pinkdot"></span>Token Circulation</h1>
                            
                            <div className="metric">
                                <span><span className="metricicon"><IoCloudySharp color={"#E40B7B"}/></span>Total supply</span>
                                <span>{formatCoinPrice(coinInfo.market_data['total_supply'])}</span>
                            </div>
                            <div className="metric">
                                <span><span className="metricicon"><BsFillClockFill color={"#E40B7B"}/></span>Cir. supply</span>
                                <span>{formatCoinPrice(coinInfo['market_data']['circulating_supply'])}</span>
                            </div>
                            
                    </TokenCirculation>
                </MetricArea>
            </Col>}
        </Row>
        </div>
    }
      </CoinDetailPageWrap>
       
    )
}


