import ProgrammingSvg from '../assets/img/computer.svg';
import ComputerSvg from '../assets/img/programming.svg';
import Jiggy from '../assets/img/jiggy.jpeg';
import Good from '../assets/img/good.jpeg';
import { motion } from 'framer-motion';
import {
  aboutUsAnimation,
  titleAnimation,
  fadeDescription,
  fadeSvg,
  profilePicAnimation,
} from '../utils/animations';

const AboutUs = () => {
  return (
    <motion.div
      variants={aboutUsAnimation}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <div className="container mt-10 mx-auto">
        <motion.div
          className="mt-20 mb-20 text-3xl font-bold"
          variants={titleAnimation}
        >
          <h1 className="text-center dark:text-white">About Us</h1>
        </motion.div>
        <motion.div variants={fadeSvg} className="flex justify-center">
          <img src={ProgrammingSvg} alt="programming" />
        </motion.div>
        <div className="flex justify-center flex-col items-center w-100 mt-10">
          <div className="flex justify-center flex-col items-center w-1/2">
            <div>
              <motion.p
                variants={fadeDescription}
                className="tracking-wider text-center dark:text-white"
              >
                Step into our vibrant blog site, where every click unveils
                captivating developer tips and delightful discoveries. From
                heartwarming travel tales to tantalizing recipes, our eclectic
                mix of content sparks joy and ignites imagination.
              </motion.p>
              <br></br>
              <motion.p
                variants={fadeDescription}
                className="tracking-wider text-center rainbow-text"
              >
                Ignite your passions. Whether you're a software developer, a
                chef, or a wellness enthusiast, there's something for everyone
                to uncover and enjoy.
              </motion.p>
              <br></br>
              <motion.p
                variants={fadeDescription}
                className="tracking-wider text-center dark:text-white"
              >
                Engage with like-minded individuals in our welcoming space.
                Share dev tips, swap recipes, or offer words of encouragement as
                we celebrate the beauty of diversity and shared passions.
              </motion.p>
            </div>
            <motion.div variants={fadeDescription} className="mt-10">
              <h1 className="text-2xl font-medium rainbow-text ">
                Meet Our Team
              </h1>
            </motion.div>
            <div className="flex space-x-36 mt-10 mb-20">
              <div>
                <a href="https://github.com/jpnws" target="_blank">
                  <motion.img
                    variants={profilePicAnimation}
                    className="rounded-full scale-75 mb-2"
                    src={Jiggy}
                    alt="Jiggy"
                  />
                  <motion.h4
                    variants={profilePicAnimation}
                    className="text-center text-2xl font-medium dark:text-white"
                  >
                    Ji
                  </motion.h4>
                  <motion.p
                    variants={profilePicAnimation}
                    className="text-center mt-2 tracking-wider font-light	dark:text-white"
                  >
                    Software Developer
                  </motion.p>
                </a>
              </div>
              <div>
                <a href="https://github.com/Austin-Imbastari" target="_blank">
                  <motion.img
                    variants={profilePicAnimation}
                    className="rounded-full scale-75 mb-2"
                    src={Good}
                    alt="Good"
                  />
                  <motion.h4
                    variants={profilePicAnimation}
                    className="text-center text-2xl font-medium dark:text-white"
                  >
                    Good
                  </motion.h4>
                  <motion.p
                    variants={profilePicAnimation}
                    className="text-center mt-2 tracking-wider font-light	dark:text-white"
                  >
                    Frontend Developer
                  </motion.p>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="mt-20 mb-10">
            <img src={ComputerSvg} alt="computer-svg" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutUs;
