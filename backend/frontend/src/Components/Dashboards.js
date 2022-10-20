import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { BACKEND_URI } from "../config/constants";

export const Dashboards = ({ medias }) => {

    

    const handleMouseEnter = (e)=>{
        e.target.play();
    }
    const handleMouseOut = (e)=>{
        e.target.pause();
    }
    
    return (
        <>
            <div className='flex flex-wrap border-box card align-items-center m-10 pl-20 pr-20 pt-6'>
                {medias.length > 0 ? (
                    medias.map((media, i) => (
                        <>
                            <div key={i} style={{ width: "320px", height: "240px" }} className='mr-4 border text-center border-2 p-4 hover:border-4 hover:border-orange-700'>
                                <div>
                                    <p>
                                        <span className='text-gray-400 font-bold'>
                                            {media.name}
                                        </span><br />
                                    </p>
                                </div>
                                <div className='clip hover:cursor-pointer' onMouseOver={handleMouseEnter} onMouseOut={handleMouseOut}>
                                    {media.videos.map((video) => {
                                        return (
                                            <video
                                                
                                                preload="auto"
                                                width="320"
                                                height="240"
                                                controls
                                            >
                                                <source src={`${BACKEND_URI}${video}`} />
                                                ;Your browser does not support the video tag.
                                            </video>
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    ))
                ) :
                    (<>
                        <div>
                            <h1>Empty Dashboards</h1>
                        </div>
                    </>)
                }
            </div>
        </>
    )
}
