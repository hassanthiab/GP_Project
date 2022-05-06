
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import React,{useState,useEffect}  from "react"
import axios from "../axios/axios";

export default function Example() {

      const [data, setData] = useState([]);

      useEffect(() => {
        axios().get('/api/admin/coursesCount').then((response)=>{
          let a=[]
          for(let i=0;i<12;i++){
            a[i]=response.data[i]
          }
         setData(a)
        }).catch((error)=>{if(!error.response)return})
        }, []);
    return (
      <div className="chart">
        <h3 className="chartTitle">#Courses</h3>
      <ResponsiveContainer width="100%" aspect={4 /2}>
          
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          {/* <YAxis /> */}
          <Tooltip />
          <Legend />
          <Bar dataKey="Reserved" fill="#8884d8" />
          <Bar dataKey="Free" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
  </div>
    );
  
}