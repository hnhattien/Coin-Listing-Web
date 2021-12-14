import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { COINGECKO_API_URL } from '../CoinmarketcapAPI/index';
import API from '../service/API/index';
import { BsSuitHeartFill } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import { RiArrowDropUpFill, RiArrowDropDownFill } from 'react-icons/ri';
import { IoLogoTwitter, IoEarthSharp, IoLogoGithub } from 'react-icons/io5';
import { Button, Pagination } from 'antd';
import { Skeleton } from 'antd';
import { BsTelegram } from 'react-icons/bs';
import TopBarProgress from 'react-topbar-progress-indicator';
import { Tooltip } from 'antd';
const CategoryFilter = styled.div`
   display: flex;
   flex-direction: row;
   margin-bottom: 2em;
   margin-top: 2em;
   align-items: center;
   *[role="button"]{
       cursor: pointer;
   }
   flex-wrap: wrap;
   .category-item.active{
       background-color: #E40B7B;
       color: white;
   }
   .category-item{
        background-color: #fff;
        box-shadow: rgb(0 0 0 / 7%) 0px 5px 10px;
        color: black;
        border-radius: 10px;
        padding: 10px;
        font-weight: 800;
        margin-right: 10px;
        margin: 5px;
   }
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
        
        background-color: ${props => props.theme.blockBg};
         
        
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
export default function HomePage({formatCoinPrice, formatFullFractionPrice}) {
    const [projects, setProjects] = useState(null);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCategory, setCurrentCategory] = useState("all");
    const [isShowAllCategory, setIsShowAllCategory] = useState(false); 
    const getCategories = () => {
        const headers = {};
        headers['Accept'] = "application/json";
        headers['Content-Type'] = "application/json";
        let params = {};
        params['order'] = "market_cap_desc";

        const url = `${COINGECKO_API_URL}/coins/categories`;
        const requestInfo = {headers, params};
     
        API.get(url,requestInfo).then((res)=>{
            console.log(res);
            if(res.error){
                setError(res.error);
            }
            else{
              if(Array.isArray(res)){
                setCategories(res);
          
              }
            }
        }).catch(err => {
            console.log(err);
        });

    }
    const toggleSeeMoreCategory = (ev) => {
        setIsShowAllCategory(!isShowAllCategory);
    }
    const getProjects = (page = 1, per_page=50) => {
        setIsLoading(true);
        if(document.querySelector("#coinList")){
            document.querySelector("#coinList").scrollIntoView({behavior: "smooth"});
        }
        const headers = {};
        headers['Accept'] = "application/json";
        headers['Content-Type'] = "application/json";
        let params = {};
        params ={
            vs_currency: 'usd', 
            order: 'volumedesc', 
            per_page: per_page, 
            page: page,
            price_change_percentage: "1m"
        };
        if(currentCategory !== 'all'){
            params['category'] = currentCategory;
        }
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
                    setIsLoading(false);
                  }
                }
            }).catch(err => {
                console.log(err);
            });     
}
const filterByCategory = (ev) => {
    if(document.querySelector(".category-item.active")){
        if(currentCategory !== ev.target.dataset.cateid){
            setCurrentCategory(ev.target.dataset.cateid);
            setProjects(null);
            document.querySelector(".category-item.active").classList.remove("active");
            document.getElementById(`${ev.target.dataset.cateid}_filter`).classList.add("active");
        }
    }
    else{
        setCurrentCategory(ev.target.dataset.cateid);
        setProjects(null);
        document.getElementById(`${ev.target.dataset.cateid}_filter`).classList.add("active")
    }
    
}
useEffect(()=>{
    if(!projects){
        getProjects();
    }
    if(!categories){
        getCategories();
    }
}, [projects])
    return (
        <div style={{paddingLeft: "50px"}}>
            {isLoading && <TopBarProgress></TopBarProgress>}
     
            <CategoryFilter>
            <span id={'all_filter'} role="button" data-cateid="all" onClick={filterByCategory} className={'category-item active'}>All</span>
                {
                    categories &&( isShowAllCategory ? (categories.map((cate, index) => {
                        return <span id={`${cate.id}_filter`} role="button" data-cateid={cate.id} onClick={(ev) => {filterByCategory(ev, cate.id)}} data-cateindex={index} className={'category-item'} key={index}>{cate.name}</span>
                    })) : (categories.slice(0,10).map((cate, index) => {
                        return <span id={`${cate.id}_filter`} role="button" data-cateid={cate.id} onClick={(ev) => {filterByCategory(ev, cate.id)}} data-cateindex={index} className={'category-item'} key={index}>{cate.name}</span>
                    }))
                    )
                }
            {
            isShowAllCategory ? (<Button style={{backgroundColor: "#E40B7B", color: "white", borderRadius: "10px"}} role="button" onClick={toggleSeeMoreCategory}>
                Less more
            </Button>) : (<Button style={{backgroundColor: "#E40B7B", color: "white", borderRadius: "10px"}} role="button" onClick={toggleSeeMoreCategory}>
                See more
            </Button>)
            }
            </CategoryFilter>
            {
                !projects && <Skeleton />
            }
            <ListingCoins id="coinList">
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
                                    <Tooltip title={formatFullFractionPrice(project.current_price)}><p className="price">{formatCoinPrice(project.current_price)}</p></Tooltip>
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
            <Pagination style={{marginTop: "4em"}} defaultCurrent={1} total={50000} defaultPageSize={50}  onChange={(currentPageNumber, pageSize) => {getProjects(currentPageNumber, pageSize);}}></Pagination>
        </div>
    )
}
