import React from 'react';
import { Newspaper, ArrowRight, X, Calendar, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const importantDates = [
  {
    id: 1,
    title: "Mom's Birthday",
    date: "March 15",
    type: "family",
    priority: "high"
  },
  {
    id: 2,
    title: "Home Insurance Renewal",
    date: "April 1",
    type: "home",
    priority: "medium"
  },
  {
    id: 3,
    title: "HVAC Maintenance",
    date: "March 20",
    type: "maintenance",
    priority: "low"
  }
];

const newsItems = [
  {
    id: 1,
    title: 'Energy Saving Tips for Summer',
    category: 'Home & Living',
    time: '2h ago',
    content: 'Learn how to reduce your energy consumption this summer with smart device automation. Set up schedules for your AC and smart blinds to maintain optimal temperature while saving energy.'
  },
  {
    id: 2,
    title: 'Smart Home Security Updates',
    category: 'Security',
    time: '4h ago',
    content: 'Important security patches released for smart door locks and cameras. Update your devices to ensure maximum protection for your home security system.'
  },
  {
    id: 3,
    title: 'New Smart Devices Released',
    category: 'Technology',
    time: '6h ago',
    content: 'Discover the latest smart home devices hitting the market, including voice-controlled lighting systems and AI-powered thermostats for better home automation.'
  }
];

export function NewsWidget() {
  const [selectedNews, setSelectedNews] = React.useState<number | null>(null);
  const [activeTab, setActiveTab] = React.useState<'news' | 'dates'>('news');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-4 relative"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('news')}
            className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-colors ${
              activeTab === 'news'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
            }`}
          >
            <Newspaper className="h-5 w-5" />
            <span className="font-medium">News</span>
          </button>
          <button
            onClick={() => setActiveTab('dates')}
            className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-colors ${
              activeTab === 'dates'
                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
            }`}
          >
            <Calendar className="h-5 w-5" />
            <span className="font-medium">Important Dates</span>
          </button>
        </div>
        <button className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 text-sm font-medium">
          View All
        </button>
      </div>
      {activeTab === 'news' ? (
        <div className="space-y-4">
        {newsItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ x: 4 }}
            className="flex items-center justify-between group cursor-pointer"
            onClick={() => setSelectedNews(item.id)}
          >
            <div>
              <h4 className="text-gray-900 dark:text-white font-medium">{item.title}</h4>
              <div className="flex items-center text-sm">
                <span className="text-blue-500 dark:text-blue-400">{item.category}</span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-gray-500 dark:text-gray-400">{item.time}</span>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
          </motion.div>
        ))}
        </div>
      ) : (
        <div className="space-y-3">
          {importantDates.map((date) => (
            <motion.div
              key={date.id}
              whileHover={{ x: 4 }}
              className={`p-3 rounded-lg ${
                date.priority === 'high'
                  ? 'bg-red-50 dark:bg-red-900/30'
                  : date.priority === 'medium'
                  ? 'bg-yellow-50 dark:bg-yellow-900/30'
                  : 'bg-green-50 dark:bg-green-900/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Star className={`h-5 w-5 ${
                    date.priority === 'high'
                      ? 'text-red-500 dark:text-red-400'
                      : date.priority === 'medium'
                      ? 'text-yellow-500 dark:text-yellow-400'
                      : 'text-green-500 dark:text-green-400'
                  }`} />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {date.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {date.date}
                    </p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  date.type === 'family'
                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                    : date.type === 'home'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {date.type}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      {selectedNews && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl p-6"
        >
          <button
            onClick={() => setSelectedNews(null)}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
          {newsItems.find(item => item.id === selectedNews) && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {newsItems.find(item => item.id === selectedNews)?.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {newsItems.find(item => item.id === selectedNews)?.content}
              </p>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}