import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { COINGECKO_API_URL } from '../CoinmarketcapAPI/index';
import API from '../service/API/index';
import { BsSuitHeartFill } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import { RiArrowDropUpFill, RiArrowDropDownFill } from 'react-icons/ri';
import { IoLogoTwitter, IoEarthSharp, IoLogoGithub } from 'react-icons/io5';

import { Skeleton } from 'antd';
import { BsTelegram } from 'react-icons/bs';
const CategoryFilter = styled.div`
   
`

const ListingCoins = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    & a{
        text-decoration: unset;
       
        color: unset;
    }
    .heart-action{
        position: absolute;
        top: 10px;
        left: 10px;
        
    }
    .card-header{
        padding-top: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        align-items: flex-start;
        .brand-wrap{
            display: flex;
            justify-content: space-around;
            align-items: center;

            .project-name-wrap{
                
                .project-name{
                    width: 20%;
                    font-size: 1em;
                    font-weight: 800;
                    margin: 0;
                    
                    
                }
                .symbol{
                    display: inline-block;
                   margin-top: 5px;
                    
                    text-transform: Uppercase !important;
                    
                }
            }
        }

        .market-wrap{
            display: flex;
            flex-direction: column;
            align-content: center;
            justify-content: center;
            align-items: center;
            .price{
                font-weight: 800;
                margin: 0;
            }
            .price-change{
                display: flex;
                align-items: center;
            }
        }
    }

    .project-card{
        display: flex;
        flex-direction: column;
        width: 20em;
        height: 14em;
        border-radius: 5%;
        box-shadow: rgb(0 0 0 / 7%) 0px 5px 10px;
        max-width: 30%;
        background-color: #fff;
        padding-left: 10px;
        padding-right: 10px;     
        
        position: relative;

        .card-info{
            padding: 10px;
        }
    }

    .project-card img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
    }
    
    .card-metric{
        display: flex;
        justify-content: space-between;
        .title{

        }
        .volume{
            text-align: right;
        }
        .market-cap{
            text-align: left;
        }
        .market-cap-value{
            font-weight: 800;
        }

        .volume-value{
            font-weight: 800;
        }
        
    }
    .card-footer{
        .socials {
            display: flex;
            gap: 10px;
            color: #B3B3B3;
            a:hover{
               color: #E40B7B;
            }
        }
    }
`
export default function HomePage() {
    const [projects, setProjects] = useState(null);
    const [error, setError] = useState(null);
  
    const getProjects = () => {
    
        const headers = {};
        headers['Accept'] = "application/json";
        headers['Content-Type'] = "application/json";
        let params = {};
        params ={
            vs_currency: 'usd', 
            order: 'volumedesc',
            category: "metaverse", 
            per_page: '250', 
            page: '1',
            price_change_percentage: "1m"
        };
        const url = `${COINGECKO_API_URL}/coins/markets`;
        
        const requestInfo = {headers, params};
        
            API.get(url,requestInfo).then((res)=>{
                console.log(res);
                if(res.error){
                    setError(res.error);
                }
                else{
                  if(Array.isArray(res)){
                    setProjects(res);
                    console.log(projects); 
                  }
                }
            }).catch(err => {
                console.log(err);
            });
   
        
}

useEffect(()=>{
    if(!projects){
      
            getProjects();
            
       
        
    }
}, [projects])
    return (
        <div style={{paddingLeft: "50px"}}>
            <h1>All Projects</h1>
            <CategoryFilter>

            </CategoryFilter>
            {
                !projects && <Skeleton />
            }
            <ListingCoins>
                {
                    projects && projects.map((project, index) => {
                        return <div className="project-card" key={index}>
                        <span className="heart-action"><BsSuitHeartFill /></span>        
                              <div className="card-info">
                              <div className="card-header">
                        <NavLink to={`/coin/${project.id}`}> 
                        <div className="brand-wrap">
                                    
                                    <img src={project.image}>
                                    </img>
                                    <div className="project-name-wrap">
                                        <p className="project-name">{project.name}</p>
                                        <span className="symbol text-gray-7">{project.symbol}</span>
                                    </div>
                                </div>
                                </NavLink>
                                <div className="market-wrap">
                                    <p className="price">${project.current_price}</p>
                                    <span className="price-change" style={{color: project.price_change_percentage_24h >= 0 ? "#17a2b8" : "#dc3545"}}>
                                    {project.price_change_percentage_24h >= 0 ? <RiArrowDropUpFill size={25} /> : <RiArrowDropDownFill size={25} />} 
                                    {" "} {project.price_change_percentage_24h}%
                                    </span>
                                </div>

                            </div>
                            <div className="card-label"></div>
                            <div className="card-metric">
                                <div className="market-cap">
                                    <span className="title">Marketcap</span>
                                    <p className="market-cap-value">${project.market_cap}</p>
                                </div>
                                <div className="volume">
                                    <span className="title">Volume</span>
                                    <p className="volume-value">${project.total_volume}</p>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="socials">

                                   <a href={'#'}><IoEarthSharp></IoEarthSharp></a>
                                   <a><IoLogoTwitter></IoLogoTwitter></a>
                                   <a><IoLogoGithub></IoLogoGithub></a>
                                   <a><BsTelegram></BsTelegram></a>
                                </div> 

                            </div>    
                        </div>
                        </div>
                    })
                }
            </ListingCoins>
        </div>
    )
}
