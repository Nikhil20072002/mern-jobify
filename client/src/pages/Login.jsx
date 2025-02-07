import React, { useEffect } from 'react'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { Logo } from '../components'
import { FormRow } from '../components/index'
import { Form, Link, redirect, useActionData, useNavigate, useNavigation } from 'react-router-dom'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  const errors = { message: '', code: '' }
  if (data.password.length < 3) {
    errors.message = 'Password too short'
    errors.code = 0
    return errors;
  }

  try {
    const response = await customFetch.post('/auth/login/', data)
    toast.success('Login successful')
    return redirect('/dashboard')
  } catch (error) {
    errors.message = error?.response?.data?.message;
    return errors;
  }
}

const Login = () => {
  const navigate = useNavigate()

  const userId = localStorage.getItem("userId")

  useEffect(()=>{
    if(userId){
      navigate('/dashboard')
    }
  },[navigate,userId])

  const loginDemoUser = async()=>{
    const data = {
      email: 'testuser@email.com',
      password: 'test123',
    }

    try {
      await customFetch.post('/auth/login/', data)
      toast.success('Take a test drive!')
      return navigate('/dashboard')
    } catch (error) {
      errors.message = error?.response?.data?.message;
      return errors;
    }
  }

  const errors = useActionData();


  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (  
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Login</h4>
        {errors?.message && <p style={{ color: "red" }}>{errors.message}</p>}
        <FormRow type='email' name='email' defaultValue='' />
        <FormRow type='password' name='password' defaultValue='' />
        <button type="submit" className='btn btn-block' disabled={isSubmitting}>{isSubmitting ? 'submitting...' : 'submit'}</button>
        <button type='button' className='btn btn-block' onClick={loginDemoUser}>Explore The App</button>
        <p>
          Not a member yet?
          <Link to="/register" className='member-btn'>Register</Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Login