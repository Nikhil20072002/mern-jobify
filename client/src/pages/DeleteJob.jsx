import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch'
import { redirect } from 'react-router-dom';

export const action = async({params})=>{
  try {
    await customFetch.delete(`/jobs/${params.id}`)
    toast.success("Job deleted successfully")
  } catch (error) {
    toast.error(error?.response?.data?.message)
  }
  return redirect('../all-jobs');
}
const DeleteJob = () => {
  return (
    <div>DeleteJob</div>
  )
}

export default DeleteJob