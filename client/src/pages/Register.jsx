import React from 'react'
import { Form,Link,redirect,useNavigation } from 'react-router-dom'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { FormRow, Logo, SubmitBtn } from '../components/index'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'

export const action = async ({request})=>{
  const formData = await request.formData();
  const data = Object.fromEntries(formData)

  try {
    await customFetch.post('/auth/register/',data)
    toast.success('Registration Successful')
    return redirect('/login') 
  } catch (error) {
    toast.error(error?.response?.data?.message)
    return error
  }
}


const Register = () => {

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting'
  
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Register</h4>
        <FormRow type='text' name='name' defaultValue='john'/>
        <FormRow type='text' name='lastName' labelText='last name' defaultValue='Doe' />
        <FormRow type='text' name='location' labelText='location' defaultValue='Hyderabad'/>
        <FormRow type='email' name='email' labelText='email' defaultValue='john@email.com'/>
        <FormRow type='password' name='password' labelText='password' defaultValue='fkljgdfklgj'/>
        <SubmitBtn formBtn/>
        <p>
          Already a member?
          <Link to='/login' className='member-btn'>Login</Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Register