import {Switch, Route} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'

import './App.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const App = () => (
  <Switch>
    <Route exact to="/login" component={Login} />
    <Route exact to="/" component={Home} />
  </Switch>
)

export default App
