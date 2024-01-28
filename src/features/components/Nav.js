import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navigate } from "react-router-dom";



import { useSelector } from 'react-redux'
import avatar from '../../media/avatar-icon-avatar-flat-symbol-isolated-on-white-background-avatar-simple-icon-avatar-abstract-icon-in-black-vector-illustration-for-graphic-desig-PH4JDM.jpg'

import LogOutButton from './LogOutButton'



const Nav = () => {
    
    const signedInUser = useSelector((state) => state.loggedInUser.value)
    const isAuthed = useSelector((state) => state.userAuthed.value)
    let templog = isAuthed

    return (
        <div className='nav-wrapper'>
        { isAuthed ? (
        
            <nav className='nav'>
            <div className='nav-links'>
                <ul>
                    <li>
                        <NavLink className='link' to="/" style={({ isActive, isPending, isTransitioning }) => {
                            return {
                                fontWeight: isActive ? "bold" : "",
                                color: isPending ? "red" : "white",
                                viewTransitionName: isTransitioning ? "slide" : "",
                            };
                        }}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink className='link' to="/leaderboard" style={({ isActive, isPending, isTransitioning }) => {
                            return {
                                fontWeight: isActive ? "bold" : "",
                                color: isPending ? "red" : "white",
                                viewTransitionName: isTransitioning ? "slide" : "",
                            };
                        }}>Leaderboard</NavLink>
                    </li>
                    <li>
                        <NavLink className='link' to="/new" style={({ isActive, isPending, isTransitioning }) => {
                            return {
                                fontWeight: isActive ? "bold" : "",
                                color: isPending ? "red" : "white",
                                viewTransitionName: isTransitioning ? "slide" : "",
                            };
                        }}>New</NavLink>
                    </li>
                    {templog ? (<LogOutButton />) : (<li>
                        <NavLink className='link' to="/login" style={({ isActive, isPending, isTransitioning }) => {
                            return {
                                fontWeight: isActive ? "bold" : "",
                                color: isPending ? "red" : "white",
                                viewTransitionName: isTransitioning ? "slide" : "",
                            };
                        }}>Login</NavLink>
                    </li>)}
                </ul>
            </div>
            
          
            <div className='signedInUser'>
                {
                    (signedInUser['avatarURL'] !== undefined && signedInUser['avatarURL'] !== '') ?
                        <img alt="User Avatar" src={signedInUser['avatarURL']} className='avatar' /> :
                        <img alt="User Avatar" src={avatar} className='avatar' />
                }
                {
                    (signedInUser['name'] !== undefined && signedInUser['name'] !== '') ? <p>{signedInUser['name']}</p> : null
                }
            </div>
        </nav>
        ) :  (<Navigate to="/login" replace={true} />)  }
        </div>
    )
}

export default Nav;