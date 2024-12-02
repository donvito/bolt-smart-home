import React, { useState, useEffect } from 'react';
import { Clock, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

interface TimeLocation {
  id: number;
  name: string;
  relation: string;
  timezone: string;
  city: string;
}

const locations: TimeLocation[] = [
  {
    id: 1,
    name: "Sarah",
    relation: "Sister",
    timezone: "America/New_York",
    city: "New York"
  },
  {
    id: 2,
    name: "James",
    relation: "Brother",
    timezone: "Europe/London",
    city: "London"
  },
  {
    id: 3,
    name: "Emma",
    relation: "Cousin",
    timezone: "Australia/Sydney",
    city: "Sydney"
  }
];

export function WorldTimeWidget() {
  const [times, setTimes] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const updateTimes = () => {
      const newTimes = locations.reduce((acc, location) => {
        const time = new Date().toLocaleTimeString('en-US', {
          timeZone: location.timezone,
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
        acc[location.timezone] = time;
        return acc;
      }, {} as { [key: string]: string });
      
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 rounded-xl shadow-lg"
    >
      <div className="flex items-center mb-4">
        <Globe className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
        <h3 className="ml-2 text-base font-semibold text-gray-900 dark:text-white">Family World Time</h3>
      </div>
      <div className="space-y-3">
        {locations.map((location) => (
          <motion.div
            key={location.id}
            whileHover={{ x: 4 }}
            className="flex items-center justify-between p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/30"
          >
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {location.name} ({location.relation})
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  {location.city}
                </p>
              </div>
            </div>
            <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
              {times[location.timezone] || '--:--'}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}