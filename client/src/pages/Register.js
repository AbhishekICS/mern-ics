import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
	const navigate = useNavigate()
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function registerForm(e){
		e.preventDefault()
		const data = { username, email, password}
		let res = await fetch('http://localhost:2000/api/user/register', {
			 method:'POST',
			 headers:{
				 "content-Type": "application/json",
				 "Accept":"application/json"
			 },
			 body: JSON.stringify(data)
		 })
		 res = await res.json()
		 navigate('/login')
	}


  return (
	<>
	<div className="container">
		<div className="main">
			<div className="login">
		<h1>Register</h1>

		<form onSubmit={registerForm} action="">
		<label >
				<h3>Username </h3>
				<input type="text" value={username} onChange={(e)=> setUsername(e.target.value)} placeholder='Enter Your Username' />
			</label>
			<label htmlFor="">
				<h3>Email </h3>
				<input type="email" placeholder='Enter Your Email' value={email} onChange={(e)=> setEmail(e.target.value)} />
			</label>
			<label htmlFor="">
				<h3>Password </h3>
				<input type="password" name="Password" id="" placeholder='Enter your Password' value={password} onChange={(e)=> setPassword(e.target.value)} />
			</label>

			<input type="submit" value="Register"/>
		</form>
		<h2>Already have Account? <span><Link to='/login'>Login</Link></span></h2>
		</div>
		</div>
	</div>
	</>
  )
}

export default Register