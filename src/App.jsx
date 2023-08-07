import { useState, useEffect } from 'react'
import './App.css'
import { TrashIcon } from '@heroicons/react/24/solid'

function App() {
  const [people, setPeople] = useState(1)
  const API_URL = `http://www.boredapi.com/api/activity?participants=${people}`
  const [activities, setActivities] = useState([])
  const [isFetch, setIsFetch] = useState(true)

  useEffect(() => {
    const fetchCall = async () => {
      const response = await fetch(API_URL)
      const data = await response.json()
      setIsFetch(false)
      if (!data.hasOwnProperty('error')) {
        setActivities(old_activities => [...old_activities, data])
      } else {
        console.log('¡Lo sentimos! no pudimos encontrar una actividad con esa cantidad de participantes. Prueba de nuevo')
      }
    }

    if (isFetch) {
      fetchCall()
    }
  }, [isFetch])

  const handleDeleteActivity = key => {
    const newActivities = activities.filter(activity => activity.key !== key)
    setActivities(newActivities)
  }

  return (
    <>
      <main>
        <h1>Lista de quehaceres</h1>
        <section className='form-section'>
          <input
            className='number-input'
            type='number'
            placeholder='N° de personas'
            value={people}
            onChange={(e) => setPeople(e.target.value)}
          />
          <button onClick={() => setIsFetch(true)}>Añadir</button>
        </section>
        <ul className='list'>
          {activities && activities.map(activity => (
            <li className='list-item' key={activity.key}>
              <div>
                <input id={activity.key} type='checkbox'/>
                <label
                  htmlFor={activity.key}
                >
                  {activity.activity}
                </label>
              </div>
              <span>
                <TrashIcon
                  className='icon'
                  onClick={() => handleDeleteActivity(activity.key)}
                />
              </span>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export default App
