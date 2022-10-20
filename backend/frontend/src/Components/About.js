import React from 'react'

export const About = () => {
  return (
    <>
      <div> 
        <section className="text-gray-600 body-font">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
              <h1 className="dark:text-white title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Technical Stack- Javascript, ReactJS
                <br className="dark:text-white hidden lg:inline-block" />CSS, Node JS, MERN Stack
              </h1>
            </div>
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
              <img className="object-cover object-center rounded" alt="hero" src="learn.svg" />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}


//Created Book Store Using React and Node JS. CRUD Operation Is Used In This Project. And Sign In & Sign Up Authentication Is Used With The Help Of MERN Stack. Axios and Fetch API Are Use In This Project. And Tailwind Is Used For Cascading Style Sheets