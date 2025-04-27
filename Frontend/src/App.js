import React from 'react';
import First from './Pages/First';
import Second from './Pages/Second';
import Third from './Pages/Third';
import Update from './Pages/Update';
import{BrowserRouter,Routes, Route} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<First />} />
      <Route path="/first" element={<First />} />
      <Route path="/second" element={<Second />} />
      <Route path="/third" element={<Third />} />
      <Route path="/update" element={<Update/>}/>
      </Routes>
      </BrowserRouter>
      
      {/* <footer><img src="crystal.png" alt="crystal" style={{ height: '150px', width: 'auto' }} /></footer> */}
  

    </div>
  );
}

export default App;
