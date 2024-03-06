import React from "react";
import ProgrammingSvg from "../../assets/img/computer.svg";
import ComputerSvg from "../../assets/img/programming.svg";

const AboutUs = () => {
    return (
        <>
            <div>
                <h1 className='text-center'>About Us</h1>
                <div>
                    <img src={ProgrammingSvg} alt='programming' />
                </div>
                <div>
                    <p></p>
                    <div>
                        <img src='' alt='' />
                        <h3></h3>
                        <p></p>
                    </div>
                    <div>
                        <div>
                            <img src='' alt='Jiggy' />
                            <h4></h4>
                            <p></p>
                        </div>
                        <div>
                            <img src='' alt='Good' />
                            <h4></h4>
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <img src={ComputerSvg} alt='computer-svg' />
                </div>
            </div>
        </>
    );
};

export default AboutUs;
