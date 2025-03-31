import React, { useState, useEffect } from 'react';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import { Icon } from 'leaflet';

function App() {
    const [violations, setViolations] = useState([]);
    const [error, setError] = useState(null);  // Track error state
    const [loading, setLoading] = useState(true);  // Track loading state

    useEffect(() => {
        console.log("🔍 Fetching data from API...");
        // Fetch violations data from the FastAPI backend
        fetch('http://127.0.0.1:8000/violations')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                console.log("Fetched data:", data);
                setViolations(data);  // Update the state with the fetched data
            })
            .catch((error) => {
                console.error('Error fetching violations:', error);
                setError('Error fetching data');
            })
            .finally(() => setLoading(false));  // Mark loading as false when done
    }, []);  // Empty dependency array ensures this runs only once when the component mounts

    if (loading) {
        return <p>Loading violations...</p>;  // Show loading message
    }

    if (error) {
        return <p>{error}</p>;  // Show error message if fetch failed
    }

    return (
        <div>
            <h1>NESC Violation Map</h1>
            <MapContainer
                center={[47.7511, -120.7401]}  // Coordinates for Washington state
                zoom={7}
                style={{ height: '100vh', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {violations.map((violation) => (
                    <Marker
                        key={violation.id}
                        position={[violation.latitude, violation.longitude]}
                        icon={new Icon({
                          iconUrl: "C:\Users\isaia\OneDrive\Desktop\nesc\frontend\myapp\public\discipline-violation-management-01.png", // Path to a custom image ico/images/discipline-violation-management-01.pngn
                          iconSize: [25, 25], // Size of the icon
                      })}
                    >
                        <Popup>
                            <strong>{violation.location}</strong><br />
                            Clearance: {violation.distance_to_building} ft
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default App;



