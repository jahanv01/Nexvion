import ThreeScene from './ThreeScene'
import { motion } from 'framer-motion'
import { Typewriter } from 'react-simple-typewriter'
import { useNavigate } from 'react-router-dom';
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
}

export default function Entry() {
  const navigate = useNavigate();
  const handleStart = ()=>{
 navigate('/projects');
  }
  return (
    <div className="relative h-[87vh] w-full overflow-hidden bg-black text-white flex items-center justify-center">
      <ThreeScene />

      <motion.div
        className="absolute z-10 text-center px-4 md:px-12 max-w-3xl"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          variants={item}
          className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
        >
          Smart Staffing<br className="hidden md:block" /> with AI Agents
        </motion.h1>

        <motion.p
          variants={item}
          className="text-lg md:text-xl text-gray-300 mb-8"
        >
          <Typewriter
            words={[
              'Connect consultants to projects.',
              'Leverage AI for smart staffing.',
              'Build dynamic, intelligent partnerships.',
            ]}
            loop={true}
            cursor
            cursorStyle="_"
            typeSpeed={40}
            deleteSpeed={30}
            delaySpeed={2000}
          />
        </motion.p>

        <motion.div variants={item}>
          <button className="bg-slate-600 hover:bg-slate-700 px-6 py-3 rounded-2xl text-white font-semibold shadow-lg transition-all" onClick={handleStart}>
            Get Started
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}
