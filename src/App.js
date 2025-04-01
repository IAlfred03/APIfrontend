import React, { useState, useEffect } from 'react';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

const API_URL = "https://apis-project-9nac.onrender.com/violations";


const customIcon = new Icon({
    iconUrl: "/discipline-violation-management-01.png", // Use relative path
    iconSize: [25, 25]
});

function App() {
    const [violations, setViolations] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("🔍 Fetching data from API...");
        fetch(API_URL)
            .then((res) => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then((data) => {
                console.log("Fetched data:", data);
                setViolations(data);
            })
            .catch((error) => {
                console.error('Error fetching violations:', error);
                setError('Error fetching data');
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading violations...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>NESC Violation Map</h1>
            <MapContainer
                center={[47.7511, -120.7401]}
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
                        icon={customIcon}
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




