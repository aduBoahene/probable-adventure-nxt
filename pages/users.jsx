import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Users() {
  const [users, setUsers] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  useEffect(() => {
    axios
      .get('/api/users')
      .then(({ data }) => {
        setUsers(data.users)
      })
      .catch((error) => {
        let message
        if (error.response) {
          message = error.response.data.message
        } else {
          message = error.message
        }
        setErrorMessage(message)
      })
  }, [])

  return (
    <div className="p-6">
      <div>
        <h1 className="mb-4 text-lg">Users:</h1>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
		<div className='md:flex md:flex-wrap'>
		{users.map((user, i) => (
          <div
            key={i}
            className="w-full p-2 flex gap-4 items-center mb-2 border-2 md:mx-4 md:cursor-pointer hover:bg-gray-200 md:mb-4 md:flex md:w-2/5 md:w-40 md:items-center md:gap-8 md:border-2 md:p-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>

            <div>
              <h4 className="md:text-4xl">
                {user.first_name} {user.last_name}
              </h4>
              <p className="md:mt-4">{user.email}</p>
            </div>
          </div>
        ))}
		</div>
      
      </div>
    </div>
  )
}
