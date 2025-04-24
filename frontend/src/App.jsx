import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Form from './components/Form'
import Home from './components/Home'
import Entry from './components/Entry'
import Project from './components/Project'
import Result from './components/Result'

function App() {

  return (
  <Routes>
     <Route path="/" element={<Layout />}>
     <Route path="/" element={<Entry />} />
     <Route path="/home" element={<Home />} />
     <Route path="/form" element={<Form />} />
     <Route path="/projects" element={<Project />} />
     <Route path="/result" element={<Result />} />
    </Route>
</Routes>
  )
}

export default App
