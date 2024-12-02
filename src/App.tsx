import React from 'react';
import { RoomCard } from './components/RoomCard';
import { WeatherWidget } from './components/WeatherWidget';
import { AIInsightsWidget } from './components/AIInsightsWidget';
import { WorldTimeWidget } from './components/WorldTimeWidget';
import { useDevices } from './hooks/useDevices';
import { motion } from 'framer-motion';
import { NewsWidget } from './components/NewsWidget';
import { ScheduleWidget } from './components/ScheduleWidget';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const { rooms, toggleDevice, updateDevice } = useDevices();

  return (
    <ThemeProvider>
      <div 
        className="min-h-screen bg-gradient-to-br from-gray-50/90 to-blue-50/90 dark:from-gray-900/95 dark:to-gray-800/95 transition-colors duration-200"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
          backgroundAttachment: 'fixed'
        }}
      >
        <main className="max-w-7xl mx-auto py-4 px-4 md:py-6 md:px-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-4 md:col-span-2 lg:col-span-1">
                <WeatherWidget />
                <AIInsightsWidget />
              </div>
              <div className="space-y-4">
                <NewsWidget />
                <WorldTimeWidget />
              </div>
              <ScheduleWidget />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
              {rooms.map((room) => (
                <RoomCard
                  key={room.id}
                  name={room.name}
                  devices={room.devices}
                  onToggleDevice={toggleDevice}
                  onUpdateDevice={updateDevice}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}
export default App;