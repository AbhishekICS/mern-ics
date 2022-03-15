import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getAllStudent } from '../store/actions/studentAction';



export const Home = () => {
	const student = useSelector((state)=> state.student.students)
	const dispatch = useDispatch()
	let token = localStorage.getItem("Token");
    let testToken = token.replace(/["]+/g, "");
	useEffect(()=>{
		dispatch(getAllStudent(testToken))
	}, [])


  return (
	  <>
	  
		  {
			student && student.map((s)=>(
				<Link to={`/user/${s._id}`} key={s._id}><div className="card">
				<h4>{s.username}</h4>
				<p>{s.email}</p>
			  </div>
			  </Link>
			))
		  }
	  
	  </>
  )
}
