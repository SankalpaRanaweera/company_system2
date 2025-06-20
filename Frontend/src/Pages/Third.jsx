import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Style.css';

export default function Third() {
    const location = useLocation();
    const navigate = useNavigate();

    const data = location.state?.data || [];

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8070/router/delete/${id}`)
            .then(response => {
                console.log(response.data);
                navigate('/First');
            })
            .catch(error => {
                console.error('There was an error deleting the record!', error);
            });
    };

    const handleUpdate = (item) => {
        navigate('/Update', { state: { data: item } }); 
    };


    return (
        <div>
            <h1 className='searchTitle'>Search Results</h1>

           
<table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Team</th>
      <th scope="col">Date</th>
      <th scope="col">Operatorname</th>
      <th scope="col">Operatorgrade</th>
      <th scope="col">Operationname</th>
      <th scope="col">Operationgrade</th>
      <th scope="col">AdjustedTime</th>
      <th scope="col">PiecesPerHour</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {data.map(item => (
      <tr key={item._id}>
        <td>{item.team}</td>
        <td  style={{textAlign:'center'}}>{new Date(item.date).toISOString().slice(0, 10)}</td>

        <td style={{textAlign:'center'}}>{item.Operatorname}</td>
        <td style={{textAlign:'center'}}>{item.Operatorgrade}</td>
        <td style={{textAlign:'center'}}>{item.Operationname}</td>
        <td style={{textAlign:'center'}}>{item.Operationgrade}</td>
        <td style={{textAlign: 'center'}}>{Number(item.adjustedTime).toFixed(2)}</td>

        <td style={{textAlign:'center'}}>{item.piecesPerHour}</td>
        <td >
          <button onClick={() => handleUpdate(item)} class="btn btn-outline-dark update" style={{marginRight:'5px'}}>Update</button>
          <button onClick={() => handleDelete(item._id)} class="btn btn-outline-dark delete">Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>



            
   </div>
    );
} 
            
 



