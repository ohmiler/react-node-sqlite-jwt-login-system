import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3001/login', { username, password })
            localStorage.setItem('token', response.data.token)
            setMessage(response.data.message)

            navigate('/dashboard')

        } catch(error) {
            setMessage(error.response.data.message)
        }
    }

  return (
    <div className='container mt-5'>
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                        <h2 className='card-title text-center mb-4'>Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username" className='form-label'>Username</label>
                                <input 
                                    type="text"
                                    className='form-control'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)} 
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className='form-label'>Password</label>
                                <input 
                                    type="password"
                                    className='form-control'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required
                                />
                            </div>
                            <button type='submit' className='btn btn-success w-100'>Login</button>
                        </form>
                        {message && <p className='mt-3 text-center'>{message}</p>}
                        <p className='mt-3 text-center'>
                            Don't have an account? <Link to='/register'>Register here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login