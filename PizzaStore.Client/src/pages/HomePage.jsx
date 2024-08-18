import { useState, useEffect } from 'react';
import { motion } from "framer-motion";

const API_URL = '/pizzas';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPizzaData();
  }, []);

  const fetchPizzaData = () => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setData(data.items))
      .catch(error => setError(error));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className='max-w-5xl w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800'
    >
      <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text'>
        Pizza Menu
      </h2>
      <ul className='grid grid-cols-3 gap-4'>
        {data.map(pizza => (
          <li key={pizza.id}>
            <div className='space-y-6'>
              <motion.div
                className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <a href={pizza.id}><h3 className='text-xl font-semibold text-green-400 mb-3'>{pizza.name}</h3></a>
                <abbr title={pizza.description} className='text-gray-300 line-clamp-3 no-underline'>{pizza.description}</abbr>
              </motion.div>
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default HomePage