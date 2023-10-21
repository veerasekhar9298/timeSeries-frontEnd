import React, { useState, useEffect } from "react";
import io from "socket.io-client";

// Define the socket connection outside the component
const socket = io("http://localhost:5443");

function App() {
  const [sensorData, setSensorData] = useState({});

  const [successRate, setSuccessRate] = useState(0);

  useEffect(() => {
    // Use useEffect to subscribe to the socket event when the component mounts
    socket.on("data", (msg) => {
      setSensorData((prevData) => {
        // Update state immutably using the functional update pattern
        return {
          ...prevData,
          [msg.timestamp]: msg.data,
        };
      });
    });

    socket.on("successRate", (success) => {
      console.log(success, "success Rate");

      setSuccessRate(parseInt(success));
    });
    // Clean up the socket connection when the component unmounts
    return () => {
      socket.off("data");
    };
  }, []);

  return (
    <div className="container">
      <h1 className="text-center m-5 pt-3">TimeSeries Log</h1>
      {Object.keys(sensorData).length > 0 && (
        <h5 className="text-end">SuccessRate -{successRate}%</h5>
      )}
      {Object.keys(sensorData).length > 0 ? (
        Object.keys(sensorData).map((timestamp, i) => {
          const sensorDatum = sensorData[timestamp];
          return (
            <div
              key={i}
              className="row bg-primary d-flex bg-opacity-25 rounded-3 shadow m-3 p-2 justify-content-center"
            >
              <h4>Time : {new Date(timestamp * 60000).toLocaleTimeString()}</h4>
              {sensorDatum.map((data, i2) => {
                return (
                  <div
                    key={i2}
                    className="bg-warning col-lg-3 bg-opacity-50 p-3 m-1 rounded-3 shadow"
                  >
                    <p>
                      <span className="fw-bold">Name :</span>
                      {data.name}
                    </p>
                    <p>
                      <span className="fw-bold">Origin :</span>
                      {data.origin}
                    </p>
                    <p>
                      <span className="fw-bold">Destination :</span>
                      {data.destination}
                    </p>
                  </div>
                );
              })}
            </div>
          );
        })
      ) : (
        <h4 className="text-center">Waiting for the Data.....</h4>
      )}
    </div>
  );
}

export default App;
