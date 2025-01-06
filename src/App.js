import React, { useState } from 'react'
import './App.css';
import News from './Components/News';
import Nvabar from './Components/Nvabar';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const App =(props)=>
{
  const pageSize=10
  const [progress,setProgress] = useState(0)

    return(
      <div>
        <Router>
          <LoadingBar height= {3} color='#f11946' progress={progress} />
          <Nvabar/>
          <Routes>
            <Route exact path='/' element={<News setProgress={setProgress} key={'general'} pageSize={pageSize} country={'us'} category={'general'}/>} />
            <Route exact path='/bussiness' element={<News setProgress={setProgress} key={'bussiness'} pageSize={pageSize} country={'us'} category={'bussiness'}/>} />
            <Route exact path='/sports' element={<News setProgress={setProgress} key={'sports'} pageSize={pageSize} country={'us'} category={'sports'}/>} />
            <Route exact path='/entertainment' element={<News setProgress={setProgress} key={'entertainment'} pageSize={pageSize} country={'us'} category={'entertainment'}/>}/>
            <Route exact path='/health' element={<News setProgress={setProgress} key={'health'} pageSize={pageSize} country={'us'} category={'health'}/>}/>
            <Route exact path='/science' element={<News setProgress={setProgress} key={'entertainment'} pageSize={pageSize} country={'us'} category={'science'}/>}/>
            <Route exact path='/technology' element={<News setProgress={setProgress} key={'technology'} pageSize={pageSize} country={'us'} category={'technology'}/>}/>
          </Routes>
        </Router>
      </div>
    )
}

export default App;