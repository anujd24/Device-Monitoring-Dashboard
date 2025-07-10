import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AudioPlayer from '../components/AudioPlayer';
import './Recordings.css'

interface Recording {
  id: number;
  name: string;
  line: string;
  channel: string;
  direction: 'In' | 'Out';
  phone: string;
  duration: string;
  datetime: string;
  comment: string;
  audioUrl: string;
}

const Recordings = () => {
  const { deviceId } = useParams<{ deviceId: string }>();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>(new Date());
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Mock API calling 
  const fetchRecordings = async (): Promise<void> => {
    setLoading(true);
    try {
      const deviceNum = deviceId ? parseInt(deviceId) : 0;
      
      if (deviceNum >= 1 && deviceNum <= 5) {
        const mockData: Recording[] = Array(5).fill(null).map((_, i) => ({
          id: i + 1,
          name: `Recording_${deviceId}_${i + 1}`,
          line: `Line ${i % 3 + 1}`,
          channel: `Channel ${i % 2 + 1}`,
          direction: i % 2 === 0 ? 'In' : 'Out',
          phone: `+1${Math.floor(Math.random() * 1000000000).toString().padStart(10, '0')}`,
          duration: `${Math.floor(Math.random() * 10)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
          datetime: new Date(new Date(date).setHours(i + 8)).toISOString(),
          comment: i % 3 === 0 ? 'Important call' : '',
          audioUrl: `/recordings/device_${deviceId}_${i + 1}.mp3`
        }));
        setRecordings(mockData);
      } else {
        setRecordings([]);
      }
    } catch (error) {
      console.error('Failed to fetch recordings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecordings();
  }, [deviceId, date]);

  const handleReload = (): void => {
    fetchRecordings();
  };

  const handleSync = (): void => {
    alert('Metadata synced!');
  };

  return (
    <div className="recordings-page">
      <div className="top-bar">
        <button onClick={() => navigate('/')}>← Back to Dashboard</button>

        <DatePicker
          selected={date}
          onChange={date => date && setDate(date)} 
          dateFormat="yyyy-MM-dd"
        />

        <div className="action-buttons">
          <button onClick={handleSync}>SYNC</button>
          <button onClick={handleReload}>RELOAD</button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : recordings.length === 0 ? (
        <p className="no-recordings">No Recordings for current date</p>
      ) : (
        <table className="recordings-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Line</th>
              <th>Channel</th>
              <th>In/Out</th>
              <th>Phone No</th>
              <th>Duration</th>
              <th>Date & Time</th>
              <th>Comment</th>
              <th>Play</th>
            </tr>
          </thead>
          <tbody>
            {recordings.map((recording) => (
              <tr key={recording.id}>
                <td>{recording.name}</td>
                <td>{recording.line}</td>
                <td>{recording.channel}</td>
                <td>{recording.direction}</td>
                <td>{recording.phone}</td>
                <td>{recording.duration}</td>
                <td>{new Date(recording.datetime).toLocaleString()}</td>
                <td>{recording.comment}</td>
                <td>
                  <AudioPlayer src={recording.audioUrl} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Recordings;