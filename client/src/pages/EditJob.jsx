import React from 'react'
import { FormRow, FormRowSelect,SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { Form, useNavigation, redirect,useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
export const loader = async ({ params }) => {
  try {
    const {data} = await customFetch.get(`/jobs/${params.id}`)
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message)
    return redirect('../all-jobs')
  }
}

export const action = async ({request,params}) => {
  const formData =await request.formData();
  const job = Object.fromEntries(formData);

  try {
    await customFetch.patch(`/jobs/${params.id}`, job);
    toast.success('Job updated successfully!')
    return redirect('../all-jobs')
  } catch (error) {
    toast.error(error?.response?.data?.message)
    return error
  }
}

const EditJob = () => {

  const job = useLoaderData()

  return <Wrapper>
    <Form method='post' className='form'>
      <h4 className="form-title">edit job</h4>
      <div className="form-center">
        <FormRow type='text' name='position' defaultValue={job?.position} />
        <FormRow type='text' name='company' defaultValue={job?.company} />
        <FormRow type='text' name='jobLocation' defaultValue={job?.jobLocation} labelText='job location' />
        <FormRowSelect type='text' name='jobStatus' defaultValue={job?.jobStatus} labelText='job status' list={Object.values(JOB_STATUS)} />
        <FormRowSelect type='text' name='jobType' defaultValue={job?.jobType} labelText='job type' list={Object.values(JOB_TYPE)}  />
        <SubmitBtn formBtn/>
      </div>
    </Form>
  </Wrapper>
}

export default EditJob