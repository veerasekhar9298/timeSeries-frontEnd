import io from "socket.io-client";
import { useState } from "react";
const socket = io("http://localhost:5443");

function App() {
  const [sensorData, setSensorData] = useState({});

  socket.on("data", (msg) => {
    const updated = { ...sensorData };
    updated[msg.timestamp] = msg.data;
    setSensorData(updated);
  });

  return (
    <div className=" container">
      <h1 className="text-center m-5 pt-3"> TimeSeries Log </h1>
        {Object.keys(sensorData).length > 0 ? (
          Object.keys(sensorData).map((ele, i) => {
            return (
              <div
                key={i}
                className="row bg-primary d-flex bg-opacity-25 rounded-3 shadow m-3 p-2"
              >
                <h4> Time : {new Date(ele * 60000).toLocaleTimeString()} </h4>

                {sensorData[ele].map((ele2, i2) => {
                  return (
                    <div
                      key={i2}
                      className="bg-warning col-lg-3 bg-opacity-50  my-3 mx-1 p-3 rounded-3 shadow"
                    >
                      {" "}
                      <p><span className="fw-bold">Name :</span>{ele2.name}</p> 
                      <p><span className="fw-bold">Origin :</span>{ele2.origin}</p>
                      <p><span className="fw-bold">Destination :</span>{ele2.destination}</p>
                    </div>
                  );
                })}
              </div>
            );
          })
        ) : (
          <h4 className="text-center"> waiting for the Data.....</h4>
        )}
    </div>
  );
}

export default App;
