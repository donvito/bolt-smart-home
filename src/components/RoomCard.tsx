import React from 'react';
import { Lightbulb, Fan, Thermometer, Power, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

interface Device {
  id: string;
  name: string;
  type: 'light' | 'fan' | 'thermostat' | 'outlet';
  isOn: boolean;
  brightness?: number;
  speed?: number;
  temperature?: number;
}

interface RoomCardProps {
  name: string;
  devices: Device[];
  onToggleDevice: (deviceId: string) => void;
  onUpdateDevice: (deviceId: string, updates: Partial<Device>) => void;
}

const DeviceIcon = ({ type, className = '' }: { type: Device['type']; className?: string }) => {
  switch (type) {
    case 'light':
      return <Lightbulb className={className} />;
    case 'fan':
      return <Fan className={className} />;
    case 'thermostat':
      return <Thermometer className={className} />;
    case 'outlet':
      return <Power className={className} />;
  }
};

const roomColors = {
  'Living Room': 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
  'Bedroom': 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
  'Kitchen': 'from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20',
  'Office': 'from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20'
};

export function RoomCard({ name, devices, onToggleDevice, onUpdateDevice }: RoomCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`bg-gradient-to-br ${roomColors[name]} backdrop-blur-sm rounded-3xl shadow-lg p-6 relative overflow-hidden transition-all duration-200`}
    >
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            {name}
          </h2>
          {devices.some(d => d.type === 'light' && d.isOn) ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>
      <div className="space-y-6">
        {devices.map((device) => (
          <div
            key={device.id}
            className="transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <DeviceIcon
                  type={device.type}
                  className={`w-5 h-5 ${device.isOn ? 
                    name === 'Living Room' ? 'text-blue-600 dark:text-blue-400' :
                    name === 'Bedroom' ? 'text-purple-600 dark:text-purple-400' :
                    name === 'Kitchen' ? 'text-emerald-600 dark:text-emerald-400' :
                    'text-yellow-600 dark:text-yellow-400'
                    : 'text-gray-400 dark:text-gray-500'}`}
                />
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{device.name}</span>
              </div>
              <button
                type="button"
                aria-label={`Toggle ${device.name}`}
                onClick={() => onToggleDevice(device.id)}
                className={`relative inline-flex h-6 w-12 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                  device.isOn ?
                    name === 'Living Room' ? 'bg-blue-500 dark:bg-blue-600' :
                    name === 'Bedroom' ? 'bg-purple-500 dark:bg-purple-600' :
                    name === 'Kitchen' ? 'bg-emerald-500 dark:bg-emerald-600' :
                    'bg-yellow-500 dark:bg-yellow-600'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    device.isOn ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <div className={`mt-4 space-y-4 ${device.isOn ? 'block' : 'hidden'}`}>
              <div className="mt-3">
                {device.type === 'light' && device.brightness !== undefined && (
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      aria-label="Brightness"
                      value={device.brightness}
                      onChange={(e) =>
                        onUpdateDevice(device.id, { brightness: Number(e.target.value) })
                      }
                      className={`w-full h-3 bg-gray-200 dark:bg-gray-600 rounded-full appearance-none cursor-pointer accent-current ${
                        name === 'Living Room' ? 'accent-blue-500' :
                        name === 'Bedroom' ? 'accent-purple-500' :
                        name === 'Kitchen' ? 'accent-emerald-500' :
                        'accent-yellow-500'
                      }`}
                    />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>0%</span>
                      <span>{device.brightness}%</span>
                      <span>100%</span>
                    </div>
                  </div>
                )}
                {device.type === 'fan' && device.speed !== undefined && (
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="3"
                      value={device.speed}
                      aria-label="Fan Speed"
                      onChange={(e) => onUpdateDevice(device.id, { speed: Number(e.target.value) })}
                      className={`w-full h-3 bg-gray-200 dark:bg-gray-600 rounded-full appearance-none cursor-pointer ${
                        name === 'Living Room' ? 'accent-blue-500' :
                        name === 'Bedroom' ? 'accent-purple-500' :
                        name === 'Kitchen' ? 'accent-emerald-500' :
                        'accent-yellow-500'
                      }`}
                    />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>Off</span>
                      <span>Low</span>
                      <span>Med</span>
                      <span>High</span>
                    </div>
                  </div>
                )}
                {device.type === 'thermostat' && device.temperature !== undefined && (
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        aria-label="Decrease temperature"
                        onClick={() =>
                          onUpdateDevice(device.id, { temperature: device.temperature! - 1 })
                        }
                        className="w-8 h-8 rounded-full flex items-center justify-center text-lg font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        −
                      </button>
                      <span className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                        {device.temperature}°
                      </span>
                      <button
                        type="button"
                        aria-label="Increase temperature"
                        onClick={() =>
                          onUpdateDevice(device.id, { temperature: device.temperature! + 1 })
                        }
                        className="w-8 h-8 rounded-full flex items-center justify-center text-lg font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      Target Temperature
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}