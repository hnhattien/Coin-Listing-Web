import React from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import { RiAuctionLine } from 'react-icons/ri'
import { GrNotes, GrProjects} from 'react-icons/gr';
import { CgSmartHomeWashMachine } from 'react-icons/cg';
import { IoMdArrowDropright, IoIosPerson } from 'react-icons/io';
import { IoAppsOutline, IoNewspaper } from 'react-icons/io5';
import {GiStack} from 'react-icons/gi';
import { VscArrowSwap } from 'react-icons/vsc';
import { BsFillCalendarEventFill } from 'react-icons/bs';
import media from '../responsive/media';
const SubmitProjectBlock = styled.div`
    &{
        background-color: rgba(0,0,0,.2);
        height: 45px;
        border-radius: 10px;
        text-align: center;
        line-height: 45px;
        cursor: pointer;
        color: white;
        
        padding-right: 10px;
        margin: auto;
    }
    &:hover{
        background-color: #E40B7B;
    }
`
const NavItemList = styled.ul`
@media ${media.xxs}{
    & li {
        height: max-content;
    }
    & > li.has-child-list{
        &:hover ul{
            display: block;
        }    
        &:hover{
            color: rgba(0,0,0,.5) !important;
            background-color: unset !important;
        }
    }
}
    @media ${media.lg}{
        & > li{
            display: flex;
            justify-content: space-between;
            position: relative;
        }
        & > li.has-child-list{
            display: flex;
            ul{
                display: none;
            }
            &:hover ul{
                display: flex;
            }    
        }
        & li.has-child-list:hover{
            background-color: #E40B7B !important;
            
            color: #ffffff !important;
        }
    }
    
    list-style: none;
    padding: 15px;
    margin: 0;
    
    & > li{
        padding-left: 10px;
        padding-right: 10px;
    }
    & > li{
        display: block;
        position: relative;
    }
    & li{
        width: 100%;
        
        margin-top: 10px;
        border-radius: 10px 10px;
        margin-bottom: 10px;
        color: rgba(0,0,0,.5) !important;
        align-items: center;
        cursor: pointer;
        .text{
            margin-left: 10px;
        }
    }
    & li > span{
        padding-top: 1em;
        padding-bottom: 1em;
    }
    & li a{
        text-decoraction: none !important;
        color: rgba(0,0,0,.5) !important;
        display: block;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        padding-top: 1em;
        padding-bottom: 1em;
    }
    & li:hover{
        background-color: #E40B7B;
        
        color: #ffffff !important;
    }
    & li a:hover{
        
        color: #ffffff !important;
    }
`
const NavItemListWrap =  styled.div`
    display: flex;
    justify-content: center;
    flex-flow: column;
`

const Dropdown = styled.ul`

@media ${media.xxs}{
    position: static;
    display: block;
    
    &{
        border: 1px solid rgba(10,10,10,0.1);
        margin-top: 1em !important;
        margin-bottom: 2em !important;
       
    }
    
}
    @media ${media.lg}{
        position: absolute !important;
        left: 100%;
        box-shadow: 10px 10px 20px rgb(0 0 0 / 7%), -10px -10px 20px rgb(0 0 0 / 7%);
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        z-index: 1000;
        
    }
    
    padding: 0 5px;
    
    display: flex;
    flex-direction: column;
    background: white;
    
    top: 0;
    justify-content: center;
    border-radius: 10px;
    li{
        
        text-align: center;
        display: flex;
        justify-content: center;
        margin: 2px;
    }
    a{
        text-align: center !important;
        padding: 0 1.7rem;
    }
    
`
export default function Navigation() {
    
    return (
        <>
        <NavItemListWrap>
            <NavItemList>
                <li>
                    
                    <NavLink to={"/"}>
                         <CgSmartHomeWashMachine></CgSmartHomeWashMachine>
                        <span className="text">Home</span>
                    </NavLink>
                    
                </li>
                <li className="has-child-list">
                    <span>
                        <IoAppsOutline></IoAppsOutline>
                        <span className="text">Projects</span>
                    </span>
                    <IoMdArrowDropright></IoMdArrowDropright>
                    <Dropdown className="dropdown">
                       <li>
                           <NavLink to={'/projects/ecosystem'}>
                               All
                           </NavLink>
                       </li>
                       <li>
                           <NavLink to={'/projects/tradable'}>
                               Tradable
                           </NavLink>
                       </li>
                       <li>
                           <NavLink to={'/projects/comming'}>
                               On going
                           </NavLink>
                       </li>
                    </Dropdown>
                </li>
                <li className="has-child-list">
                    <span>
                        <RiAuctionLine></RiAuctionLine>
                        <span className="text">Auction</span>
                    </span>
                    <IoMdArrowDropright></IoMdArrowDropright>
                    <ul>

                    </ul>
                </li>
                <li>
                    
                    <NavLink to={'/coin/indices'}>
                        <GiStack></GiStack>
                        <span className="text">Indices (TBD)</span>
                    </NavLink>
                </li>
                <li>
                   
                    <NavLink to={"/coin/swap"}>
                        <VscArrowSwap></VscArrowSwap>
                        <span className="text">Swap (TBD)</span>
                    </NavLink>
                </li>
                <li>
                    
                    <NavLink to={"/blog"}>
                        <IoNewspaper></IoNewspaper>    
                        <span className="text">Blog</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/events"}>
                        <BsFillCalendarEventFill></BsFillCalendarEventFill>
                        <span className="text">Events</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/events"}>
                        <IoIosPerson></IoIosPerson>
                        <span className="text">My Portfolio</span>
                    </NavLink>
                </li>
            </NavItemList>
            
        </NavItemListWrap>
        <SubmitProjectBlock>
        Submit Project    
</SubmitProjectBlock>
        </>
    )
}
