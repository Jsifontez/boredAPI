import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const API_URL = 'http://www.boredapi.com/api/activity?participants=1'
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
        {activities && activities.map(activity => {
          return <p key={activity.key}>{activity.activity}</p>
        })}
      </main>
    </>
  )
}

export default App
