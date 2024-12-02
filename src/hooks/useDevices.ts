import { useState } from 'react';
interface Device {
  id: string;
  name: string;
  type: 'light' | 'fan' | 'thermostat' | 'outlet';
  isOn: boolean;
  brightness?: number;
  speed?: number;
  temperature?: number;
}

interface Room {
  id: string;
  name: string;
  devices: Device[];
}

const initialRooms: Room[] = [
  {
    id: 'living-room',
    name: 'Living Room',
    devices: [
      { id: 'lr-light-1', name: 'Main Light', type: 'light', isOn: false, brightness: 100 },
      { id: 'lr-fan-1', name: 'Ceiling Fan', type: 'fan', isOn: false, speed: 2 },
      { id: 'lr-outlet-1', name: 'TV Outlet', type: 'outlet', isOn: false },
    ],
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    devices: [
      { id: 'br-light-1', name: 'Main Light', type: 'light', isOn: false, brightness: 80 },
      { id: 'br-thermostat', name: 'Thermostat', type: 'thermostat', isOn: true, temperature: 72 },
    ],
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    devices: [
      { id: 'kt-light-1', name: 'Main Light', type: 'light', isOn: false, brightness: 100 },
      { id: 'kt-light-2', name: 'Under Cabinet', type: 'light', isOn: false, brightness: 70 },
      { id: 'kt-outlet-1', name: 'Coffee Maker', type: 'outlet', isOn: false },
    ],
  },
  {
    id: 'office',
    name: 'Office',
    devices: [
      { id: 'of-light-1', name: 'Desk Light', type: 'light', isOn: false, brightness: 90 },
      { id: 'of-fan-1', name: 'Desk Fan', type: 'fan', isOn: false, speed: 1 },
      { id: 'of-outlet-1', name: 'Laptop Charger', type: 'outlet', isOn: true },
    ],
  },
];

export function useDevices() {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);

  const toggleDevice = (deviceId: string) => {
    setRooms((currentRooms) =>
      currentRooms.map((room) => ({
        ...room,
        devices: room.devices.map((device) =>
          device.id === deviceId ? { ...device, isOn: !device.isOn } : device
        ),
      }))
    );
  };

  const updateDevice = (deviceId: string, updates: Partial<Device>) => {
    setRooms((currentRooms) =>
      currentRooms.map((room) => ({
        ...room,
        devices: room.devices.map((device) =>
          device.id === deviceId ? { ...device, ...updates } : device
        ),
      }))
    );
  };

  return { rooms, toggleDevice, updateDevice };
}