
import { useEffect,useState } from "react";

import "../CSS/admin.css";
import { Chart as Chartjs , BarElement , CategoryScale ,LinearScale , Tooltip , Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import axios from "axios";

Chartjs.register(BarElement , CategoryScale ,LinearScale , Tooltip , Legend)

const Admin = ()=>{

    const [name,setName] = useState("")
    const [location,setLocation] = useState("");
    const [charge,setCharge] = useState('No');
    const [value,setValue]  = useState({});
    const [cat_6,setCat_6] = useState(99);
    const [cat_7,setCat_7] = useState(79);
    const [cat_8,setCat_8] = useState(59);
    const [cat_9,setCat_9] = useState(39);
    const [cat_10,setCat_10] = useState(19);
    const [show,setShow]    = useState(false);
    const [feed,setFeed] = useState({});
    
    const meta = {
        labels:['category_6','category_7','category_8','category_9','category_10'],
        datasets:[
            {
                data:[99,79,59,39,19],
                backgroundColor: '#F0C3F1',
                borderRadius: 2,
            }
        ]
    }

    const options = {
        scales: {
          x: {
            grid: {
              display: false, // Hide x-axis grid lines
            },
            borderColor: '#FFFFFF',
          },
          y: {
            grid: {
              display: false, // Hide y-axis grid lines
            },
            ticks: {
                display: false, // Hide y-axis labels
            },
            beginAtZero: true,
            scaleLabel: {
                display: true,
                labelString: '$', // Display the label "$"
                padding: { top: 10, bottom: 10 },
                color: '#FFFFFF'
            },
          },
        },
        plugins: {
          legend: {
            display: false, // Hide legend
          },
        },
        barThickness: 20,
        indexAxis: 'x'
      };
      



    useEffect(()=>{
        axios({
            method:"GET",
            url: `https://stg.dhunjam.in/account/admin/${sessionStorage.getItem('id')}`
        })
        .then((data)=>{
            console.log(data.data.data);
            setName(data.data.data.name);
            setLocation(data.data.data.location);
            setValue(data.data.data.amount);
            setCharge(data.data.data.charge_customers);
            setCat_6(data.data.data.amount.category_6);
            setCat_7(data.data.data.amount.category_7);
            setCat_8(data.data.data.amount.category_8);
            setCat_9(data.data.data.amount.category_9);
            setCat_10(data.data.data.amount.category_10);

            let resp = data.data.data.amount;

            let g = {
                    labels:['category_6','category_7','category_8','category_9','category_10'],
                    datasets:[
                        {
                            data:[resp.category_6,resp.category_7,resp.category_8,resp.category_9,resp.category_10],
                            backgroundColor: '#F0C3F1',
                            borderRadius: 2,
                        }
                    ]
            }

            setFeed(g);
            setShow(true);
            
        })
        .catch((err)=>{
            console.log(err)
        })
    },[]);

    function disable()
    {
        let btn = document.getElementById("form-btn");
        btn.setAttribute("disabled",true);
        btn.style.background = "grey";
        btn.style.cursor = "not-allowed";
    }

    function enable()
    {
        let btn = document.getElementById("form-btn");
        btn.setAttribute("disabled",false);
        btn.style.background = "#6741D9";
        btn.style.cursor = "pointer";
    }

    function handleChange(e)
    {
        if(e.target.id == "amount")
        {
            setCat_6(e.target.value);
        }

        if(e.target.id == "cat-7")
        {
            setCat_7(e.target.value);
        }

        if(e.target.id == "cat-8")
        {
            setCat_8(e.target.value);  
        }

        if(e.target.id == "cat-9")
        {
            setCat_9(e.target.value);
        }

        if(e.target.id == "cat-10")
        {
            setCat_10(e.target.value);
        }
    }

    function handleRadio(e)
    {
        setCharge(e.target.value);
        if(e.target.value == 'Yes')
            enable();
        else{
            disable();
        }
    }

    function handleSubmit(e)
    {
        e.preventDefault();
        let response = {};

        if(cat_6 >= 99 && cat_7 >= 79 && cat_8 >= 59 && cat_9 >= 39 && cat_10 >= 19)
        {
            if(cat_6 != value.category_6)
            {
                response = { ...response , category_6: Number(cat_6)}
            }

            if(cat_7 != value.category_7)
            {
                response = { ...response , category_7: Number(cat_7) }
            }

            if(cat_8 != value.category_8)
            {
                response = { ...response , category_8: Number(cat_8) }
            }

            if(cat_9 != value.category_9)
            {
                response = {...response,category_9: Number(cat_9)}
            }

            if(cat_10 != value.category_10)
            {
                response = { ...response , category_10: Number(cat_10) }
            }
        }

        response = { amount: response }
        response = JSON.stringify(response);
        console.log(response);

        let url = `https://stg.dhunjam.in/account/admin/${sessionStorage.getItem('id')}`;
        console.log(url);

        axios({
            method:"PUT",
            url,
            data:response
        })
        .then((data)=>{
            console.log(data.data.data);
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return(
        <div className="dashboard-container">
            <form className="dashboard-form" onSubmit={handleSubmit}>
                 <h1>{name},{location} on Dhun Jam</h1>
                 <div className="field-container">
                    <p>Do you want to charge your customers for requesting songs ?</p>
                    <div onChange={handleRadio}>
                        <input type="radio" value="Yes" name="charge" id="Yes" checked={charge === 'Yes'}/>
                        <label htmlFor="Yes">Yes</label>
                        <input type="radio" value="No" name="charge"id="No" checked={charge === 'No'}/>
                        <label htmlFor="No">No</label>
                    </div>
                 </div>
                 <div className="field-container amount-field">
                    <p>Custom song request Amount-</p>
                    <input type="text" id="amount" name="amout" value={cat_6} onChange={handleChange}></input>
                 </div>
                 <div className="field-container song-request-field">
                    <p>Regular song request amount</p>
                    <div>
                        <input type="text" name="cat-1" id="cat-7" value={cat_7} onChange={handleChange}/>
                        <input type="text" name="cat-2" id="cat-8" value={cat_8} onChange={handleChange}/>
                        <input type="text" name="cat-3" id="cat-9" value={cat_9} onChange={handleChange}/>
                        <input type="text" name="cat-4" id="cat-10" value={cat_10} onChange={handleChange}/>
                    </div>
                 </div>
                 <div className="graph-container">
                    {
                        show ? <Bar data={feed} options={options}></Bar> : <p></p> 
                    }
                 </div>
                 <button id="form-btn">Save</button>
            </form>
        </div>
    )
};


export default Admin;