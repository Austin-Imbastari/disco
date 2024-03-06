import React from "react";
import ProgrammingSvg from "../../assets/img/computer.svg";
import ComputerSvg from "../../assets/img/programming.svg";
import Jiggy from "../../assets/img/jiggy.jpeg";
import Good from "../../assets/img/good.jpeg";

const AboutUs = () => {
    return (
        <>
            <div className='container mt-10 mx-auto'>
                <div className='mt-20 mb-20 text-3xl font-bold'>
                    <h1 className='text-center '>About Us</h1>
                </div>
                <div className='flex justify-center'>
                    <img src={ProgrammingSvg} alt='programming' />
                </div>
                <div className='flex justify-center flex-col items-center w-100 mt-10'>
                    <div className='flex justify-center flex-col items-center w-1/2'>
                        <div>
                            <p className='tracking-wider text-center'>
                                {" "}
                                Step into our vibrant blog site, where every click unveils captivating stories and
                                delightful discoveries. From heartwarming travel tales to tantalizing recipes, our
                                eclectic mix of content sparks joy and ignites imagination.
                            </p>
                            <br></br>
                            <p className='tracking-wider text-center rainbow-text'>
                                Dive into our virtual library of articles curated to ignite your passions. Whether
                                you're an adventurer, a chef, or a wellness enthusiast, there's something for everyone
                                to uncover and enjoy.
                            </p>
                            <br></br>
                            <p className='tracking-wider text-center'>
                                Engage with like-minded individuals in our welcoming space. Share travel tips, swap
                                recipes, or offer words of encouragement as we celebrate the beauty of diversity and
                                shared passions.
                            </p>
                        </div>
                        <div className='mt-10'>
                            {/* <img src='' alt='' /> */}

                            <h1 className='text-2xl font-medium rainbow-text'>Meet Our Team</h1>
                            {/* <p></p> */}
                        </div>
                        <div className='flex space-x-36 mt-10 mb-20'>
                            <div>
                                <a href='https://github.com/jpnws' target='_blank'>
                                    <img className='rounded-full scale-75' src={Jiggy} alt='Jiggy' />
                                    <h4 className='text-center text-2xl font-medium'>Jiggy</h4>
                                    <p className='text-center mt-2 tracking-wider font-light	'>Software Developer</p>
                                </a>
                            </div>
                            <div>
                                <a href='https://github.com/Austin-Imbastari' target='_blank'>
                                    <img className='rounded-full scale-75' src={Good} alt='Good' />
                                    <h4 className='text-center text-2xl font-medium'>Good</h4>
                                    <p className='text-center mt-2 tracking-wider font-light	'>Frontend Developer</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div>
                    <div className='mt-20'>
                        <img src={ComputerSvg} alt='computer-svg' />
                    </div>
                </div> */}
            </div>
        </>
    );
};

export default AboutUs;
