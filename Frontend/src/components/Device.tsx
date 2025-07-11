import { Link } from 'react-router-dom';
import type { DeviceTypes } from '../types/types';
import './Device.css'

interface DeviceProps {
  device: DeviceTypes;
  isVisible: boolean;
}

const Device = ({ device, isVisible }: DeviceProps) => {
  return (
    <div className={`device-card ${isVisible ? 'visible' : 'hidden'}`}>
      <h3>{device.name}</h3>
      <p>Status: <span className={device.status.toLowerCase()}>{device.status}</span></p>
      <p>Last Updated: {new Date(device.lastUpdated).toLocaleString()}</p>
      <div className="radio-row">
        <input type="radio" id={`device-${device.id}`} name="device-select" />
        <label htmlFor={`device-${device.id}`}>Select</label>
      </div>
      <Link to={`/recordings/${device.id}`} className="recordings-button">
        Recordings
      </Link>
    </div>
  );
};

export default Device;