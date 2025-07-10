import { useState } from "react";
import Device from "../components/Device";
import Pagination from "../components/Pagination"

const Dashboard = () =>{
    const [currentPage, setCurrentPage] = useState(1);
    const devices = 8; // this is for devices per page

    // Mock data (replace with API fetch)
  const device = Array(20).fill(1).map((_, i) => ({
    id: i + 1,
    name: `Device ${i + 1}`,
    status: i % 3 === 0 ? 'Online' : 'Offline',
    lastUpdated: new Date().toISOString(),
  }));

  const indexOfLastDevice = currentPage * devices;
  const indexOfFirstDevice = indexOfLastDevice - devices;
  const currentDevices = device.slice(indexOfFirstDevice, indexOfLastDevice);

   return (
    <div className="dashboard">
      <h1>Device Dashboard</h1>
      <div className="devices-grid">
        {device.map((device) => (
          <Device
            key={device.id}
            device={device}
            isVisible={currentDevices.some(d => d.id === device.id)}
          />
        ))}
      </div>
      <Pagination
        totalDevices={device.length}
        devicesPerPage={devices}
        currentPage={currentPage}
        paginate={setCurrentPage}
      />
    </div>
  );
}

export default Dashboard;