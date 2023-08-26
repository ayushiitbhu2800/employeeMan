import React, { useState, useEffect } from 'react';
import './App.css';
import axios, { formToJSON } from 'axios';
import Employee from './Employee';

function App() {
  const [data, setData] = useState([]); // Initialize data state as null
  const [input,setInput] = useState({"fname":"","lname":"","mno":0});
  const post = ()=>{
    console.log(input);
    let json={
      "firstName": input.fname,
      "lastName": input.lname,
      "mobileNumber": input.mno
    }
    console.log(data)
    axios.post("http://localhost:8080/saveEmployee",json).then(
      response=>{
        console.log("Successful");
      }
    ).catch(error=>{
      console.log(error);
    });
  }
  
  useEffect(() => {
    // Make the Axios GET request
    let a=[]
    axios.get('http://localhost:8080/getAllEmployees')
      .then(response => {
        // Handle the successful response
        
        for(let i=0;i<response.data.length;i++){
          let id = response.data[i].id
          let fname = response.data[i].firstName
          let lname = response.data[i].lastName
          let mno = response.data[i].mobileNumber
          const newEmp = new Employee(id,fname,lname,mno);
          a.push(newEmp)
        }
        setData(a); // Update the data state
      })
      .catch(error => {
        // Handle errors
        console.error('Error fetching data:', error);
      });
  }, [data]); // Empty dependency array ensures the effect runs only once after the initial render
  const deleteEmployee=(i)  =>{
    console.log(data)
    let v = data.filter((element)=> i===element.id)
    let json={
      "id": v[0].id,
      "firstName": v[0].fname,
      "lastName": v[0].lname,
      "mobileNumber": v[0].mno
    }
    console.log(json)
    axios.post("http://localhost:8080/deleteEmployee",json).then(
      response=>{
        console.log("Successful");
      }
    ).catch(error=>{
      console.log(error);
    });
  }
  const handleSetFname=(event)=>{
      let f=input
      f.fname=event.target.value;
      setInput(f);
  }
  const handleSetLname=(event)=>{
    let f=input
    f.lname=event.target.value;
    setInput(f);
  }
  const handleSetMno=(event)=>{
    let f=input
    f.mno=event.target.value;
    setInput(f);
  }
  return (
    <div className="App">
      <div>
        <input name='fname' onChange={handleSetFname}/>
        <input name='lname' onChange={handleSetLname}/>
        <input name='mno' onChange={handleSetMno}/>
        <button onClick={post}>Add</button>
      </div> 
      <table style={{border: "2px solid black"}}>
        <thead>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Mobile Number</th>
          <th>Action</th>
        </thead>
        <tbody>
        {
          data.map((element,index) => {
            return <tr key={element.id}>
            <td>{element.fname}</td>
            <td>{element.lname}</td>
            <td>{element.mno}</td>
            <td><button key={element.id} onClick={()=>deleteEmployee(element.id)}>Delete</button></td>
            </tr>
          })
        }
        </tbody>
      </table>
    </div>
  );
}

export default App;
