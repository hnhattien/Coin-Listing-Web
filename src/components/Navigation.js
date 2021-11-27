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
    list-style: none;
    padding: 15px;
    margin: 0;
    li.has-child-list{
        justify-content: space-between;
    }
    li{
        display: flex;
        width: 100%;
        height: 45px;
        padding-left: 10px;
        padding-right: 10px;
        margin-top: 10px;
        border-radius: 10px 10px;
        margin-bottom: 10px;
        color: rgba(0,0,0,.5) !important;
        align-items: center;
        cursor: pointer;
        ul{
            position: absolute;
        }
        .text{
            margin-left: 10px;
        }
    }
    & li a{
        text-decoraction: none !important;
        color: rgba(0,0,0,.5) !important;
        display: block;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }
    & li:hover{
        background-color: #E40B7B;
        text-decoraction: none !important;
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
                    <ul>
                       <li>
                           <NavLink to={'/projects'}>
                               All
                           </NavLink>
                       </li>
                    </ul>
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
