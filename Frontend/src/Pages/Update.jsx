import React, { useState } from 'react';
import { useLocation,useNavigate } from "react-router-dom";
import axios from 'axios';
import Stopwatch from '../components/Stopwatch';
import './Style.css';

export default function Update() {
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state?.data || {};
    const [team, setTeam] = useState(data.team || '');
    const [date, setDate] = useState(data.date || '');
    const [op1, setOp1] = useState(data.Operatorname || '');
    const [grade1, setGrade1] = useState(data.Operatorgrade || '');
    const [op2, setOp2] = useState(data.Operationname || '');
    const [grade2, setGrade2] = useState(data.Operationgrade || '');
    const [adjustedTime, setAdjustedTime] = useState(data.adjustedTime || '');
    const [piecesPerHour, setPiecesPerHour] = useState(data.piecesPerHour || '');

    const handleStopwatchChange = (adjustedTimeValue, piecesPerHourValue) => {
        setAdjustedTime(adjustedTimeValue);
        setPiecesPerHour(piecesPerHourValue);
    };

    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8070/router/update/${data._id}`, {
            team,
            date,
            Operatorname: op1,
            Operatorgrade: grade1,
            Operationname: op2,
            Operationgrade: grade2,
            adjustedTime: adjustedTime,
            piecesPerHour: piecesPerHour 
        
        })
        .then(response => {
            console.log(response.data);
            navigate('/First');
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    };

    return (
        <div>
            <h1 class="h1second">Update details</h1>
            <form onSubmit={handleUpdate}>
                <label class="form-label team2">Team</label>
                <div class="teamsecond">
                <input type="text" name="team" class="form-control w-50 " value={team} onChange={(e) => setTeam(e.target.value)} /><br/>
                </div>

                <label class="form-label date2">Date</label>
                <div class="datesecond">
                <input type="date" name="date" class="form-control w-50 " value={date} onChange={(e) => setDate(e.target.value)} /><br/>
                </div>
                
                <label class="form-label operation">Operation</label>
                <div class="operationsecond">
                <input type="text" name="op1" class="form-control w-50 " value={op1} onChange={(e) => setOp1(e.target.value)} />
                </div>
                
                <label class="form-label grade1">Grade</label>
                <div class="grade1second" >
                <input type="text" name="grade1" class="form-control w-50 " value={grade1} onChange={(e) => setGrade1(e.target.value)} /><br/>
                </div>
                
                <label class="form-label operator">Operator</label>
                <div class="operatorsecond">
                <input type="text" name="op2" class="form-control w-50 " value={op2} onChange={(e) => setOp2(e.target.value)} />
                </div>
                
                <label class="form-label grade2">Grade</label>
                <div class="grade2second">
                <input type="text" name="grade2" class="form-control w-50 " value={grade2} onChange={(e) => setGrade2(e.target.value)} /><br/>
                </div>

                
                
                <input type="submit"class="btn btn-outline-light ok" value="OK" />
              
            </form>
            <Stopwatch onStopwatchChange={handleStopwatchChange} />

        </div>
    );
}

