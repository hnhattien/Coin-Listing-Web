import { Header } from 'antd/lib/layout/layout'
import React, { useCallback, useEffect, useState, memo } from 'react'
import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import { trending } from '../schema/apidata';
import { NavLink } from 'react-router-dom';
import Icon from 'react-crypto-icons';
import { COINGECKO_API_URL } from '../CoinmarketcapAPI/index';
import _ from 'lodash';
import {useNavigate} from 'react-router-dom';
import {RiArrowDropDownFill, RiArrowDropUpFill} from 'react-icons/ri';
import API from '../service/API/index';
import { message } from 'antd';
import Login from "./Login";
import { FiMenu } from 'react-icons/fi';
import  media, { getAnyMedia }  from '../responsive/media';
const Div = styled.div`

    background-color: ${props => props.theme.blockBg};
    color: ${props => props.theme.font.color};
    @media ${media.xxs}{
        align-items: center;
        display: flex;
        justify-content: center;
        align-content: center;        
        flex-direction: column;
        
        
    }
    
    box-shadow: rgb(0 0 0 / 7%) 0px 5px 10px;
    #content-layout{
      margin-left: ${props => props.contentMargin}  
    }
    position: relative;
    z-index: 1000;
    @media ${media.lg}{
        height: 4rem;
        align-items: center;
        display: flex;
        justify-content: space-around;
        flex-direction: row;
    }
`
const Search = styled.div`
    background-color: white;
    border-radius: 10px;
    border: 1px solid rgba(10,10,10,0.1);
    color: black;
    display: flex;
    align-items: center;
    padding: 2px;
    padding-right: 10px;
    padding-left: 6px;
    position: relative;
    z-index: 1000;
`

const SearchInputWrap = styled.div`
    display: flex;
    align-items: center;
`
const Completion = styled.div`

`
const SearchInput = styled.input`
    appearance: none;
    height: 30px;
    width: 236px;
    outline: none;
    background-color: white;
    border: 0;
    font-size: 1em;
    &::placeholder{
        
    }
`

const MarketNews24Hours = styled.div`
color: ${props => props.theme.font.color};
  overflow: hidden;
  height: 60px;
  width: 100%;
  max-height: 60px;
  
  padding: 1em;
  ul{
    transition: transform ease-in-out 500ms;
list-style: none;
  padding: 0;
  width: fit-content;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0;
  margin-top: 0;
  }
  .coin{
      span,p{
        font-weight: 700;
      }
      .symbol{
        color: ${props => props.theme.font.color}; 
        
      }
      .price{
        font-size: 0.75em;
        display: flex;
        align-items: center;
      }
  }
  .name-wrap{
     
  }
  @media ${media.xxs}{
    ul{
       width: 100%;
       font-size: 12px;
    }
    li{
        margin-bottom: 30px;
        display: flex;
        align-items: center;
        div.coin{
            display: flex;
            div{
                padding-right: 5%;
                padding-left: 5%;
                p{
                    margin: 0 !important;
                }
            }
        }
      }
  }
  @media ${getAnyMedia(1180)}{
    li{
        margin-bottom: 30px;
        display: flex;
        align-items: center;
        div.coin{
            display: flex;
            div{
                padding-right: 7px;
                padding-left: 5px;
                p{
                    margin: 0 !important;
                }
            }
        }
      }
  }

  
  img{
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
  }

  @media ${media.xxs}{
    ul{
        justify-content: center;
    }
}
`
const Trending = styled.div`
    position: absolute;
    width: 100%;
    background-color: ${props => props.theme.blockBg};
    border-radius: 20px;
    box-shadow: 10px 10px 25px rgb(0 0 0 / 7%);
    top: 100%;
    padding: 0 15px 0 15px;
    left: 0;
    box-sizing: border-box;
    
    transform: ${
       props => props.isShow ? "scaleY(1);" : "scaleY(0);"
    }

    transition: transform 200ms ease-in-out;
    transform-origin: center top;

`
const TrendingItem = styled.div`
    font-weight: 800;
    border-radius: 10px;
    padding: 0 5px 0 5px;
    font-size: 1em;
    &:hover{
        background-color: ${props => props.theme.hoverBg};
    }
    
    a{
        color: ${props => props.theme.font.color} !important;
        padding-top: 1.2em;
        padding-bottom: 1.2em;
        display: block;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;

    }

    background-image: ${props => {
        const backgroundData = [];
        if(props.rank >= 3){
            return `url(/flame.svg)`;
        }
        else{
            for(let i = 0; i < 4-props.rank; i++){
                backgroundData.push(`url(/flame.svg)`);
            }
            return backgroundData.join(',');
        }
    }};
    
    background-repeat: no-repeat;
    background-size: 14px;
    background-position: ${props => {
        const backgroundPositionData = [];
        switch(props.rank){
           case 1 : return "100%, 90%, 80%;";
           case 2 : return "80%, 90%";
           default: return "90%";
        }
    }}

`

const MenuButton = styled.span`
    @media ${media.xxs}{
        cursor: pointer;
        display: initial;
        color: ${props => props.theme.font.color};
    
    }
    @media ${media.lg}{
        display: none;
    }
`

function HeaderBar() {
    const [contentLayoutMargin, setContentLayoutMargin] = useState(0);
    const navigate = useNavigate();
    const [trendingData, setTrendingData] = useState(trending.slice().sort((a, b) => {
        return -(a.score_trending - b.score_trending);
    }));
    const [isShowTrending, setIsShowTrending] = useState(false);
    const setSizeContentLayout = useCallback(()=>{
        const marginLeft = document.querySelector("#navbar-layout").clientWidth;
        if(marginLeft){
          setContentLayoutMargin(marginLeft);
        }
        
        
    })

    
    const [marketNews24HData, setMarketNews24HData] = useState(null);
    const [error, setError] = useState(null);
  
    
    const fetchCoinNews24H = () => {
        const headers = {};
        headers['Accept'] = "application/json";
        headers['Content-Type'] = "application/json";
        let params = {};
        params ={
            vs_currency: 'usd', 
            order: 'volumedesc', 
            per_page: '100', 
            page: '1',
            price_change_percentage: "24h"
        };
        const url = `${COINGECKO_API_URL}/coins/markets`;
        
        const requestInfo = {headers, params};
        API.get(url,requestInfo).then((res)=>{
           
            if(res.error){
                setError(res.error);
            }
            else{
              if(Array.isArray(res)){
                const formatedChunk = _.chunk(res,4);
                setMarketNews24HData(formatedChunk);
                
              }
            }
        }).catch(err => {
            console.log(err);
        });
        
}
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const animateCoinNews = () => {
      if(marketNews24HData){
        const length = marketNews24HData.length;
       
        const id = setInterval(()=>{
            
              
               
                if(currentIndex < (length - 1)){
                  setCurrentIndex(prevIndex => prevIndex +1);
                
                } 
              else{
                setCurrentIndex(0);
              }
         
            
        }, 2000)
        return id;

      }
           
         }

    const showMobileNavBar = () => {
        document.querySelector("#navbar-wrap").classList.toggle("show");
    }
    useEffect(()=>{
      if(marketNews24HData === null){
    
            fetchCoinNews24H();
   
      }
      
      if(marketNews24HData){
        const animateCoinNewsIntervalId = animateCoinNews();
        return () => clearInterval(animateCoinNewsIntervalId);
      }
      
        setSizeContentLayout();
      
      
        
        
    }, [marketNews24HData, currentIndex])

    

    return (
        
       
            <Div contentLayoutMargin={contentLayoutMargin} >
                <MarketNews24Hours className="coin-news-24h coin-news-animation ">
                     {
                        !marketNews24HData && "Loading..." 
                    }
                    {error && message.error(error.msg) }
                  { marketNews24HData && <ul style={{transform: `translateY(-${document.querySelector(".coin-news-24h li.active") && document.querySelector(".coin-news-24h li.active").offsetTop}px)`}}>
                   
                     
                     {
                        marketNews24HData.map((coinChunk, index) => {
                            return  <li key={index} className={currentIndex === index ? 'active' : ""} key={index}>
                            {
                                coinChunk.map((coin, indexChunk) => {
                                return  <NavLink  key={indexChunk} to={`/coin/${coin.id}`} style={{display: 'block'}}>
                                    <div className="coin" key={indexChunk}>
                                    <div className="image"><img src={coin.image}></img></div>
                                    <div className="name-wrap">
                                        <p className="symbol">{coin.symbol.toUpperCase()}</p>
                                        <span style={{color: coin.price_change_percentage_24h >= 0 ? "#17a2b8" : "#dc3545"}} className="price">
                                            ${Number(coin.current_price)} 
                                            {" "} {coin.price_change_percentage_24h >= 0 ? <RiArrowDropUpFill size={25} /> : <RiArrowDropDownFill size={25} />}
                                        </span>
                                    </div>
                                </div>
                                </NavLink>

                                })
                            }
                            </li>
                        })
                     }
                    </ul>
                }
                
                            
                    
                    
                   
                </MarketNews24Hours>
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", paddingLeft: "10px", paddingRight:"10px"}}>
                <MenuButton onClick={showMobileNavBar}>
                <FiMenu size={40}></FiMenu>
            </MenuButton>
                <Search>
                    
                    <SearchInputWrap>
                    <SearchInput onBlur={(ev) => {  setIsShowTrending(false) }} onFocus={(ev) => { if(!ev.target.value) setIsShowTrending(true); }} onInput={(ev) => {setIsShowTrending(false)}} placeholder='CasperMarketcap Search...'>

                    </SearchInput>
                    <BiSearch size={"20"}></BiSearch>
                    </SearchInputWrap>
                    <Trending isShow={isShowTrending}>
                        <h1>Trending keyword</h1>
                        {
                           
                            trendingData.map((trendingItem, index) => {
                               
                                if(index === 0){
                                    trendingItem.rank = 1;
                                }
                                else if(index > 0 && trendingItem.score_trending < trendingData[index - 1].score_trending){
                                    trendingItem.rank = trendingData.slice()[index-1].rank+1;
                                }
                                else{
                                    trendingItem.rank = trendingData.slice()[index-1].rank;
                                }
                                
                                return trendingItem;
                                
                            }).map((coin, index) => {
                                
                                return <TrendingItem key={index} className="item" score={coin.score_trending} rank={coin.rank}>
                                <NavLink to={`/coin/${coin.slug}`}>
                                      
                                <span style={{marginRight: "10px", display: "inline-block"}}>
                                    <Icon  name={coin.icon} size={30}></Icon>
                                    
                                </span>
                                <span>{coin.name}</span>
                                </NavLink>
                            </TrendingItem>
                            })
                            
                            
                            
                        }
                    </Trending>
                    <Completion>
                        
                    </Completion>
                </Search>
                
            <Login/>
                </div>
            </Div>        
                  
       
        
    )
}

export default memo(HeaderBar);
