import { useState,useEffect } from "react";
import './App.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
);
export default function All_csv() {
   //fetch data from port 5000
    const [data3, setData] = useState([]);
    const [table,setTable] = useState();
    const [negative, setNegative] = useState();
    const [none, setNone] = useState();
    const [study, setStudy] = useState();
    const [image, setImage] = useState();
    const [first, setFirst] = useState();
    const [second, setSecond] = useState();
    const [third, setThird] = useState();
    const [fourth, setFourth] = useState();
    const [fifth, setFifth] = useState();
    const [select,setSelect] = useState();
    let count_study = 0;
    let count_image = 0;
    let countnega = 0;
    let count_none = 0;
    let First = 0;
    let Second = 0;
    let Third = 0;
    let Fourth = 0;
    let Fifth = 0;
    let bar = null;
    const labels = ["negative", "none","study","image","1","0","0","1","1"];
    function get_data(){
        fetch('http://localhost:5000/')
        .then(response => response.json())
        .then(data => setData(data))
    
    const table = data3.map((item) => (
        <tr>
            <td>{item.id}</td>
            <td>{item.PredictionString}</td>
        </tr>
    ));
    setTable(table);
    const csv_predict = data3.map((item) => (
        item.PredictionString
    ));
    const csv_id = data3.map((item) => (
        item.id
    ));
    const csv_id_split = csv_id.map((item) => (
        item.split("_")
    ));
    for (let i = 0; i < csv_predict.length; i++) {
        if (csv_predict[i].includes("negative")) {
            countnega++;
        }
        setNegative(countnega);

        if (csv_predict[i].includes("none")) {
            count_none++;
        }
        setNone(count_none);
    }

    for (let i = 0; i < csv_id_split.length; i++) {
        if (csv_id_split[i][1] == "study") {
            count_study++;
        }
        setStudy(count_study);
        if (csv_id_split[i][1] == "image") {
            count_image++;
        }
        setImage(count_image);
    }

    const csv = csv_predict.map((item) => (
        item.split(" ")
    ));

    for (let i = 0; i < csv.length; i++) {
      if (csv[i][1] === "1") {
        First++;
      }
      if (csv[i][2] === "0") {
        Second++;
      }
      if (csv[i][3] === "0") {
        Third++;
      }
      if (csv[i][4] === "1") {
        Fourth++;
      }
      if (csv[i][5] === "1") {
        Fifth++;
      }
    }
    setFirst(String(First));
    setSecond(String(Second));
    setThird(String(Third));
    setFourth(String(Fourth));
    setFifth(String(Fifth));

    setSelect("sample");
  }

  const data = {
    labels,
    datasets: [
      {
        label: ["negative", "none","study","image","1","0","0","1","1"],
        data: [negative, none, study, image,first,second,third,fourth,fifth],
        backgroundColor: ["rgba(53, 162, 235, 0.5)", "rgba(53, 162, 235, 0.5)", "rgba(53, 162, 235, 0.5)", "rgba(53, 162, 235, 0.5)", "rgba(53, 162, 235, 0.5)", "rgba(53, 162, 235, 0.5)", "rgba(53, 162, 235, 0.5)", "rgba(53, 162, 235, 0.5)", "rgba(53, 162, 235, 0.5)"],
      },
    ],
  };
  const graph = null
  if(select === 'sample'){
    bar = <Bar data={data} />
  }
  return (
    <div className="con">
    <button onClick={get_data} className="bot">Sample_Submission.csv</button>
    <div className="cont">
      <h2>Table</h2>
    </div>
    
    <div className="container csv">
      
        <table className="table">
          {table}</table> 
    </div>
    <div className="Bar">
      <h2>Graph</h2>
      {bar}
    </div>
  </div>
  )
}