import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FloatingLabel, Form } from 'react-bootstrap'
import { loginAPI } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';

import bg from '../assets/bg1.png'
import mobile from '../assets/mobile.jpg'

function Login() {
    const [inputData, setInputData] = useState({
        email: "", password: ""
    })
    const [validEmail, setValidEmail] = useState(false)
    const [validPassword, setValidPassword] = useState(false)
    const navigate = useNavigate()
    const handleInputData = (e) => {
        const { name, value } = e.target

        // ---------Validation Email------------
        if (name == "email") {
            if (value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) || "") {
                setValidEmail(false)
            } else {
                setValidEmail(true)
            }
        }
        // ---------Validation Password------------
        if (name == "password") {
            if (value.match(/^[a-zA-Z0-9]{3,9}$/) || "") {
                setValidPassword(false)
            } else {
                setValidPassword(true)
            }
        }

        setInputData({ ...inputData, [name]: value })
    }

    console.log(inputData);

    const handleLogin = async(e) =>{
        e.preventDefault()
       const {email, password} = inputData
       if(!email || !password){
        toast.warning("Please fill the form completely!!!")
       }
       else{
        try {
            const result = await loginAPI(inputData)
            console.log(result);
            if(result.status == 200){
                toast.success(result.data.message)
                localStorage.setItem("adminToken", result.data.token)
                // navigate("/dashboard")
            }else{
                toast.error(result.response.data)
            }
        } catch (error) {
            console.log(error);
        }
       }
    }
    return (
        <div  style={{height:'90vh'}} className='w-100  py-5 d-flex align-items-center justify-content-center text-white'>
            <div className="container ">
                <div style={{backgroundImage:`url(${bg})`, backgroundRepeat:'no-repeat', backgroundSize:'cover', backgroundPosition:'center'}} className='card shadow-lg'>
                    <div className="row d-flex align-items-center py-5">
                        <div style={{backgroundImage:'url(https://i.postimg.cc/q7y9RxP8/robot-hand-background-presenting-technology-gesture-1.png)', backgroundRepeat:'no-repeat', backgroundSize:'cover', backgroundPosition:'center',translate:'-10px 40px' }} className="col-lg-5 col-md-5 mb-5">
                            <img style={{translate:'-10px -115px'}} src="https://i.postimg.cc/kg6rrmwY/Group-481764.png" className='img-fluid w-100' alt="login" />
                            
                        </div>
                        <div className="col-lg-1 col-md-1"></div>
                        <div className="col-lg-5 col-md-5">
                            <Form className='d-flex flex-column gap-2'>
                                <h3 className='text-white fw-bold'>ADMIN LOGIN</h3>
                                <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3" >
                                    <Form.Control type="text" name='email' value={inputData.email} onChange={handleInputData} placeholder="Email" />
                                    {validEmail && <p className='text-danger fw-bolder mt-2'>Invalid Email</p>}
                                </FloatingLabel>

                                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3" >
                                    <Form.Control type="text" name='password' value={inputData.password} onChange={handleInputData} placeholder="Password" />
                                    {validPassword && <p className='text-danger fw-bolder mt-2'>Invalid Password</p>}
                                </FloatingLabel>

                                <div className="my-3 d-grid">
                                    <button onClick={handleLogin} className="btn btn-primary">Login</button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer theme='dark' autoClose={1800} />
        </div>
    )
}

export default Login