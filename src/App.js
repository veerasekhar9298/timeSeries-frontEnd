import io from 'socket.io-client'
import {useState} from 'react'
const socket = io('http://localhost:5443')

function App() {


    const [sensorData,setSensorData] = useState({})


    socket.on('data',(msg)=>{
      const updated = {...sensorData}
            updated[msg.timestamp] = msg.data
            setSensorData(updated)
    })


  return (
    <div className="App">
        <h1>Sensor Log </h1>
        {
          Object.keys(sensorData).length >0 ? (Object.keys(sensorData).map((ele,i)=>{

            return <div key = {i}>
                  <h4> Time : {new Date(ele*60000).toLocaleTimeString()} </h4>

                  {
                    sensorData[ele].map((ele2,i2)=>{
                      return <p> {ele2.name} ----- {ele2.origin} ---- {ele2.destination}</p>
                    })
                  }
              </div>

          })):(<h4> waiting for the Data.....</h4>)
        }
    </div>
  );
}

export default App;
