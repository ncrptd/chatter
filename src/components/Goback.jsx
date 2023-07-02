import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Goback() {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(-1)} className='cursor-pointer hover:opacity-75'>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 256 256"><path fill="currentColor" d="M220 128a4 4 0 0 1-4 4H49.66l65.17 65.17a4 4 0 0 1-5.66 5.66l-72-72a4 4 0 0 1 0-5.66l72-72a4 4 0 0 1 5.66 5.66L49.66 124H216a4 4 0 0 1 4 4Z" /></svg>
        </div>
    )
}
