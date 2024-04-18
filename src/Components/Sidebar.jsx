import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { BsFillBarChartLineFill } from "react-icons/bs";
import { GrDocument } from "react-icons/gr";
import { FiAlertCircle, FiLogOut, FiUsers } from "react-icons/fi";
import { TbReportSearch } from "react-icons/tb";
import { FaProjectDiagram } from "react-icons/fa";

import NavLinks from "./Sidebar/NavLinks";
import Projects from "./Sidebar/Projects";

import {
  arrowVariants,
  navVariants,
  projectsContainerVariants,
} from "./Sidebar/SidebarAnimationVariants";

import { ProjectsData } from "../Data/ProjectsData";

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isProjectContainerOpen, setIsProjectContainerOpen] = useState(false);
  const [projects, setProjects] = useState(ProjectsData);

  const arrowControls = useAnimationControls();
  const navControls = useAnimationControls();
  const projectsContainerControls = useAnimationControls();

  useEffect(() => {
    if (isOpen) {
      navControls.start("open");
      arrowControls.start("open");
    } else {
      navControls.start("close");
      arrowControls.start("close");
    }
  }, [isOpen, arrowControls, navControls]);

  useEffect(() => {
    if (isProjectContainerOpen) {
      projectsContainerControls.start("open");
    } else {
      projectsContainerControls.start("close");
    }
  }, [isProjectContainerOpen, projectsContainerControls]);

  const handleOpenClose = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setIsProjectContainerOpen(false);
    }
  };

  const handleProjectContainerOpenClose = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => {
        setIsProjectContainerOpen(true);
      }, 200);
      return clearTimeout();
    }
    setIsProjectContainerOpen(!isProjectContainerOpen);
  };

  return (
    <motion.nav
      variants={navVariants}
      animate={navControls}
      initial='close'
      className='bg-neutral-800 flex flex-col z-10 gap-20 p-5 min-h-screen h-auto shadow shadow-neutral-600 
      scroll-bar-webkit'
    >
      <div className='flex flex-row w-full justify-between place-items-center '>
        <div
          onMouseEnter={() => setIsMenuOpen(true)}
          onMouseLeave={() => setIsMenuOpen(false)}
          className={`w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-700 rounded-full relative ${
            isOpen ? "overflow-visible" : "overflow-hidden"
          }`}
        >
          <span
            className='flex justify-center
                place-items-center font-poppins text-white font-bold text-xl h-full w-full'
          >
            A
          </span>
          {isOpen && (
            <>
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className='pr-3 border border-neutral-700 bg-neutral-800 absolute top-12 left-0 z-30 shadow-2xl shadow-neutral-950 text-neutral-100 rounded-md'
                  >
                    <div className='bg-transparent h-5 w-full absolute -top-4 left-0 z-100' />
                    <a
                      href='#'
                      className=' p-4 hover:underline flex gap-3 justify-center place-items-center'
                    >
                      <FiLogOut />
                      Logout
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
        <button className='p-1 rounded-full flex' onClick={() => handleOpenClose()}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1}
            stroke='currentColor'
            className='w-8 h-8 stroke-neutral-200'
          >
            <motion.path
              variants={arrowVariants}
              animate={arrowControls}
              initial='close'
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3'
            />
          </svg>
        </button>
      </div>

      <div className='flex flex-col gap-3'>
        <motion.div
          variants={projectsContainerVariants}
          animate={projectsContainerControls}
          initial='close'
          className={`flex flex-col p-1 rounded cursor-pointer hover:stroke-neutral-100 stroke-neutral-400 text-neutral-400 hover:text-neutral-400 place-items-start gap-3 border border-transparent hover:border-neutral-500/80 transition-colors duration-100 ${
            isProjectContainerOpen ? "overflow-visible" : "overflow-clip"
          } `}
        >
          <div
            className='flex flex-row place-items-center gap-3 w-full'
            onClick={() => handleProjectContainerOpenClose()}
          >
            <FaProjectDiagram className='min-w-8 w-8' />
            <p className='text-inherit font-poppins overflow-clip whitespace-nowrap tracking-wide'>
              Projects
            </p>
          </div>
          <div className='flex flex-col gap-3 pl-11 mt-2 w-full '>
            {projects.map((project) => (
              <Projects key={project.id} {...project} />
            ))}
          </div>
        </motion.div>
        <NavLinks name='Projects List'>
          <BsFillBarChartLineFill className='min-w-8 w-8 scale-125' />
        </NavLinks>
        <NavLinks name='Rejected Projects'>
          <GrDocument className='min-w-8 w-8 scale-125' />
        </NavLinks>
        <NavLinks name='Add Projects'>
          <FiAlertCircle className='min-w-8 w-8 scale-125' />
        </NavLinks>
        <NavLinks name='Reporting'>
          <TbReportSearch className='min-w-8 w-8 scale-125' />
        </NavLinks>
        <NavLinks name='Users'>
          <FiUsers className='min-w-8 w-8 scale-125' />
        </NavLinks>
      </div>
    </motion.nav>
  );
};

export default Sidebar;
