import React from 'react';
import { Calendar, Clock, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const weeklyEvents = [
  {
    id: 1,
    title: "Team Meeting",
    day: "Monday",
    date: "March 18",
    time: "10:00 AM",
    type: "work"
  },
  {
    id: 2,
    title: "Kids Soccer Practice",
    day: "Tuesday",
    date: "March 19",
    time: "4:00 PM",
    type: "family"
  },
  {
    id: 3,
    title: "Grocery Shopping",
    day: "Wednesday",
    date: "March 20",
    time: "6:00 PM",
    type: "home"
  },
  {
    id: 4,
    title: "Family Movie Night",
    day: "Friday",
    date: "March 22",
    time: "7:00 PM",
    type: "family"
  },
  {
    id: 5,
    title: "House Cleaning",
    day: "Saturday",
    date: "March 23",
    time: "10:00 AM",
    type: "home"
  }
];

const scheduleItems = [
  {
    id: 1,
    time: '08:30 AM',
    action: 'Start Coffee Maker',
    status: 'active',
    type: 'automation'
  },
  {
    id: 2,
    time: '09:00 AM',
    action: 'Kids School Drop-off',
    status: 'active',
    type: 'family'
  },
  {
    id: 3,
    time: '03:30 PM',
    action: 'Kids Piano Lesson',
    status: 'upcoming',
    type: 'family'
  },
  {
    id: 4,
    time: '10:00 PM',
    action: 'Set Night Mode',
    status: 'upcoming',
    type: 'automation'
  }
];

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function ScheduleWidget() {
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [viewMode, setViewMode] = React.useState<'month' | 'week'>('month');
  const [showAll, setShowAll] = React.useState(false);

  const displayedItems = showAll ? scheduleItems : scheduleItems.slice(0, 3);

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 relative"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Calendar className="h-6 w-6 text-blue-500 dark:text-blue-400" />
          <h3 className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">Daily Schedule</h3>
        </div>
        <button
          onClick={() => setShowCalendar(true)}
          className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 text-sm font-medium"
        >
          View Calendar
        </button>
      </div>
      <div className="space-y-4">
        {displayedItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.02 }}
            className={`flex items-center space-x-4 p-3 rounded-lg ${
              item.type === 'family' 
                ? 'bg-purple-50 dark:bg-purple-900/30' 
                : 'bg-gray-50 dark:bg-gray-700/50'
            }`}
          >
            <Clock className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            <div className="flex-1">
              <div className="flex items-center">
                <span className="text-gray-900 dark:text-white font-medium">{item.time}</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  item.status === 'active' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300'
                }`}>
                  {item.status === 'active' ? 'Active' : 'Upcoming'}
                </span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  item.type === 'family'
                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                }`}>
                  {item.type === 'family' ? 'Family' : 'Automation'}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{item.action}</p>
            </div>
          </motion.div>
        ))}
        {!showAll && scheduleItems.length > 3 && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => setShowAll(true)}
            className="w-full py-2 text-sm text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"
          >
            Show More ({scheduleItems.length - 3} items)
          </motion.button>
        )}
      </div>
      {showCalendar && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl p-4"
        >
          <button
            onClick={() => setShowCalendar(false)}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('month')}
                className={`px-3 py-1 rounded-lg text-sm ${viewMode === 'month' 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-400'}`}
              >Month</button>
              <button
                onClick={() => setViewMode('week')}
                className={`px-3 py-1 rounded-lg text-sm ${viewMode === 'week' 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-400'}`}
              >Week</button>
            </div>
            <button onClick={prevMonth} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <ChevronLeft className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <button onClick={nextMonth} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <ChevronRight className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
          {viewMode === 'month' ? (
            <>
              <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-gray-500 dark:text-gray-400 font-medium">{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 35 }).map((_, i) => (
                  <button
                    key={i}
                    className="aspect-square rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center text-sm"
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-3 mt-2 max-h-[400px] overflow-y-auto">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                <div key={day} className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">{day}</h4>
                  <div className="space-y-2">
                    {weeklyEvents
                      .filter(event => event.day === day)
                      .map(event => (
                        <motion.div
                          key={event.id}
                          whileHover={{ x: 4 }}
                          className={`p-2 rounded-lg ${
                            event.type === 'family'
                              ? 'bg-purple-50 dark:bg-purple-900/30'
                              : event.type === 'work'
                              ? 'bg-blue-50 dark:bg-blue-900/30'
                              : 'bg-green-50 dark:bg-green-900/30'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">{event.title}</span>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-500 dark:text-gray-400">{event.date}</span>
                                <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{event.time}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}