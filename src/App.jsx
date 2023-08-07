import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [people, setPeople] = useState(1)
  const API_URL = `http://www.boredapi.com/api/activity?participants=${people}`
  const [activities, setAtivities] = useState([])
  const [isFetch, setIsFetch] = useState(true)

  useEffect(() => {
    const fetchCall = async () => {
      const response = await fetch(API_URL)
      const data = await response.json()
      setIsFetch(false)
      setAtivities(old_activities => [...old_activities, data])
    }

    if (isFetch) {
      fetchCall()
    }
  }, [isFetch])

  return (
    <>
      <main>
        <h1>Bored API Lista de quehaceres</h1>
        <input
          type='number'
          placeholder='N° de personas'
          value={people}
          onChange={(e) => setPeople(e.target.value)}
        />
        <button onClick={() => setIsFetch(true)}>Añadir</button>
        {activities && activities.map(activity => {
          return <p key={activity.key}>{activity.activity}</p>
        })}
      </main>
    </>
  )
}

export default App
