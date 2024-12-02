import React from 'react';
import { Cloud, Sun, Droplets } from 'lucide-react';
import { motion } from 'framer-motion';

export function WeatherWidget() {
  return (
    <motion.div
      className="bg-gradient-to-br from-blue-500/90 to-blue-600/90 dark:from-blue-600/90 dark:to-blue-700/90 backdrop-blur-sm p-6 rounded-2xl text-white shadow-lg md:h-[140px] flex flex-col justify-between"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold">72°F</p>
          <p className="text-sm opacity-90">Partly Cloudy</p>
        </div>
        <div className="flex items-center space-x-2 -mt-2">
          <Sun className="h-8 w-8 text-yellow-300" />
          <Cloud className="h-10 w-10" />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-base">
        <div className="flex items-center">
          <Droplets className="h-5 w-5 mr-2" />
          <span>45%</span>
        </div>
        <span>High: 75° Low: 65°</span>
      </div>
    </motion.div>
  );
}