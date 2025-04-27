import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Stopwatch from '../components/Stopwatch';
import './Style.css';

export default function Second() {
    const [team, setTeam] = useState('');
    const [date, setDate] = useState('');
    const [op1, setOp1] = useState('');
    const [grade1, setGrade1] = useState('');
    const [op2, setOp2] = useState('');
    const [grade2, setGrade2] = useState('');
    const [adjustedTime, setAdjustedTime] = useState('');
    const [piecesPerHour, setPiecesPerHour] = useState('');
    const navigate = useNavigate();

    const handleStopwatchChange = (adjustedTimeValue, piecesPerHourValue) => {
        setAdjustedTime(adjustedTimeValue);
        setPiecesPerHour(piecesPerHourValue);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!adjustedTime || !piecesPerHour) {
            alert('Please start and stop the stopwatch before submitting.');
            return;
        }

        axios.post('http://localhost:8070/router/add', {
            team: team,
            date: date,
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
            <h1 class="h1second">Operator details</h1>
            <form onSubmit={handleSubmit}>
            
                <lable class="form-label team2">Team</lable>
                 <div class="teamsecond">
                <input type="text" name="team" class="form-control w-50 " value={team} onChange={(e) => setTeam(e.target.value)} />
                </div>

                <label class="form-label date2">Date</label>
                <div class="datesecond">
                <input type="date" name="date" class="form-control w-50 " value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                
                
                <label class="form-label operation">Operation</label>
                <div class="operationsecond">
                <input type="text" name="op1" class="form-control w-50 " value={op1} onChange={(e) => setOp1(e.target.value)} />
                </div>
                
                <label class="form-label grade1">Grade</label>
                <div class="grade1second" >
                <input type="text" name="grade1" class="form-control w-50 " value={grade1} onChange={(e) => setGrade1(e.target.value)} />
                </div>
                
                
                <label class="form-label operator">Operator</label>
                <div class="operatorsecond">
                <input type="text" name="op2" class="form-control w-50 " value={op2} onChange={(e) => setOp2(e.target.value)} />
                </div>
                
                <label class="form-label grade2">Grade</label>
                <div class="grade2second">
                <input type="text" name="grade2" class="form-control w-50 " value={grade2} onChange={(e) => setGrade2(e.target.value)} />
                </div>
                <br/>
               
            <input type="submit" class="btn btn-outline-light ok" value="OK" />
           
            </form>
            
            <Stopwatch onStopwatchChange={handleStopwatchChange} />

        </div>
    );
}

