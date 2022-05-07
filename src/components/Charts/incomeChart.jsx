
import axios from "../axios/axios";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  import React,{useState,useEffect}  from "react"

 export default function Chart({ grid }) {
   const [data, setData] = useState([]);
  useEffect(() => {
      axios().get('/api/admin/incomeSum').then((response)=>{

      let a=[]
      for(let i=0;i<12;i++){
        a[i]=response.data[i]
      }
     setData(a)
    }).catch((error)=>{if(!error.response)return})
    }, []);

    return (
      <div className="chart">
        <h3 className="chartTitle">Income (ILS)</h3>
        <ResponsiveContainer width="100%" aspect={4 / 2}>
          <LineChart data={data}
           margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
            <XAxis dataKey="name" stroke="#5550bd" />
            {/* <YAxis /> */}
            <Line type="monotone" dataKey="income" stroke="#5550bd" />
            <Tooltip />
            {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }