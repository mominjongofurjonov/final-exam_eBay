import  { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import instance from '../../api/axios.tsx'
import { useDispatch } from 'react-redux'
import { register } from '../../redux/mainSlice.tsx'
import './Register.scss'
import { Link } from 'react-router-dom'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const dispatch = useDispatch()
    const navigate =  useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [avatar, setAvatar] = useState("") 
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => {
            setLoading(false);
            instance.post("/users/", { name, email, password, avatar })
            .then(response => {
                console.log(response)
                if(response.data.id){ 
                    alert("Successfully registered!")
                    dispatch(register(response.data))
                    navigate("/login")
                }
            })
            .catch(error => {
                console.log(error)
                error.response.data.message.forEach(e => {
                    toast.warning(e)
                })
            })
            .finally(() => {
                setLoading(false)
            });
        }, 4000);
    }

    return (
        <div>
            <img width={200} className="login_logo" src="https://cdn.worldvectorlogo.com/logos/ebay-3.svg" alt="" />

            <div className='register_wrapper'>
                <h1 className='register_title'>Register</h1>
                <form onSubmit={handleSubmit} className='register_form'>
                    <input className='input' type="text" value={name} placeholder='Your name' onChange={e => setName(e.target.value)} />
                    
                    <input className='input' type="email" value={email} placeholder='Your email' onChange={e => setEmail(e.target.value)} />
                    
                    <input  className='input' type="password" value={password} placeholder='Your password' onChange={e => setPassword(e.target.value)} />
                    
                    <input className='input' type="url" value={avatar} placeholder='Your avatar URL' onChange={e => setAvatar(e.target.value)} />
                    
                    <button className='register_btn' disabled={loading}>{loading ? 'Registering...' : 'Register'}</button> 
                </form>
                <p className='register_text'>By Creating an account, you agree to our User Agreement and acknowledge reading our User Privacy Notice .</p>
                <p className='register_link'>already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    )
}

export default Register
