import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function EntryScreen() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/projects");
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-2xl shadow-xl p-10 max-w-xl text-center space-y-6"
      >
        <h1 className="text-4xl font-bold text-gray-800">
          MatchWise
        </h1>
        <p className="text-gray-600 text-lg">
          Smartly match consultants to the right projects.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStart}
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 transition duration-300"
        >
          Start
        </motion.button>
      </motion.div>
    </div>
  );
}
