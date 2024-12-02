import React from 'react';
import { Brain, TrendingUp, BatteryCharging, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const insights = [
  {
    id: 1,
    title: 'Energy Optimization',
    description: 'Your AC usage has decreased by 15% this week.',
    icon: TrendingUp,
    color: 'text-green-500 dark:text-green-400',
    bg: 'bg-green-50 dark:bg-green-900/30'
  },
  {
    id: 2,
    title: 'Smart Charging',
    description: 'Devices are scheduled to charge during off-peak hours.',
    icon: BatteryCharging,
    color: 'text-blue-500 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-900/30'
  },
  {
    id: 3,
    title: 'Usage Pattern',
    description: 'Living room lights are most active between 6-9 PM.',
    icon: Zap,
    color: 'text-purple-500 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-900/30'
  }
];

export function AIInsightsWidget() {
  return (
    <motion.div
      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 rounded-xl shadow-lg"
    >
      <div className="flex items-center mb-4">
        <Brain className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
        <h3 className="ml-2 text-base font-semibold text-gray-900 dark:text-white">AI Insights</h3>
      </div>
      <div className="space-y-3">
        {insights.map((insight) => (
          <motion.div
            key={insight.id}
            whileHover={{ x: 4 }}
            className={`${insight.bg} p-3 rounded-lg transition-transform hover:scale-[1.02]`}
          >
            <div className="flex items-start">
              <insight.icon className={`h-5 w-5 mt-0.5 ${insight.color}`} />
              <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  {insight.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {insight.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}