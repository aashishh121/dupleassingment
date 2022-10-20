import React, { useState } from 'react'
import { LockClosedIcon } from '@heroicons/react/solid'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { BACKEND_URI } from "../config/constants";

const Addvideos = ({ getAllMedias }) => {

    const [name, setName] = useState("");
     const [videos, setVideos] = useState([]);

    const navigate = useNavigate();

    const hadleSubmit = (e) => {
        e.preventDefault();

        let formdata = new FormData();
        for (let key in videos) {
            formdata.append("videos", videos[key]);
        }

        formdata.append("name", name);

        axios
            .post(`${BACKEND_URI}/api/v1/media/create`, formdata)
            .then((success) => {
                getAllMedias();
                alert("Submitted successfully");
            })
            .catch((error) => {
                console.log(error);
                alert("Error happened!");
            });

        navigate("/dashboard");
    };

    return (
        <>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="mx-auto h-12 w-auto w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                            </svg>
                        </a>
                        <h2 className="dark:text-white mt-6 text-center text-3xl font-extrabold text-gray-900">Add Your Favourite Books</h2>
                    </div>
                    <form className="mt-8 space-y-6">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="name" className="sr-only">
                                    Video Name
                                </label>
                                <input
                                    value={name}
                                    onChange={(e) => { setName(e.target.value) }}
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="mb-3 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Book Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="videos">Upload Videos</label>
                                <input
                                    type="file"
                                    required
                                    name="videos"
                                    id="videos"
                                    multiple
                                    className="mb-3 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    accept=".mp4, .mkv"
                                    onChange={(e) => {
                                        setVideos(e.target.files);
                                    }}
                                    placeholder="Video URL"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                onClick={hadleSubmit}
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                </span>
                                Confirm
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Addvideos