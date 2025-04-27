import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Style.css';

function First() {
    const [team, setTeam] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        axios.get('http://localhost:8070/router/get', {
            params: { team, date }
           
        })
        .then(response => {
            navigate('/Third',{ state: { data: response.data } });
          
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    };

    return (
        // <div class="background">
        //     <img src="crystal.png" alt="crystal"  />
        //     <label class="form-label team">Team</label>
        //     <div class="team">
        //     <input type="text" class="form-control w-50 " name="team" value={team} onChange={(e) => setTeam(e.target.value)} /> <br/>
        //     </div>
        //     <label class="form-label date">Date</label>
        //     <div class="date">
        //          <input type="date"class="form-control w-50 " name="date" value={date} onChange={(e) => setDate(e.target.value)} /> <br/>
        //     </div>
         

        //      <button type="button" class="btn btn-outline-light search"onClick={handleSubmit}>Search</button><br/>
        //      <button type="button" class="btn btn-outline-light start"onClick={() => navigate('/Second')}>Start</button>
        // </div>

        <div class="background">
    <img src="crystal.png" alt="crystal" style={{marginLeft:'-10px'}} />
    
    <div class="row mb-3">
        <label class="col-sm-2 col-form-label title1" >Team</label>
        <div class="col-sm-10">
            <input type="text" class="form-control w-50 teamField" name="team" value={team} onChange={(e) => setTeam(e.target.value)} />
        </div>
    </div>
    
    <div class="row mb-3">
        <label class="col-sm-2 col-form-label title2">Date</label>
        <div class="col-sm-10">
            <input type="date" class="form-control w-50" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        
    </div>
    
    <button type="button" class="btn btn-outline-light search" onClick={handleSubmit}>Search</button><br/>
    <button type="button" class="btn btn-outline-light start" onClick={() => navigate('/Second')}>Start</button>
</div>


    );
}

export default First;
 



