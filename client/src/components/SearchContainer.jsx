import { FormRow, FormRowSelect, SubmitBtn } from '.';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, useSubmit, Link } from 'react-router-dom';
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from '../../../utils/constants';
import { useAllJobsContext } from '../pages/AllJobs';

const SearchContainer = () => {

  const { searchValues } = useAllJobsContext()
  const { search='', jobStatus='all', jobType='all', sort='newest' } = searchValues

  const submit = useSubmit();


  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };


  return <Wrapper>
    <Form className='form'>
      <h5 className="form-title">search form</h5>
      <div className="form-center">
        <FormRow labelText='Search' name='search' defaultValue={search} isRequired={false} onChange={debounce((form) => { submit(form); })} />
        <FormRowSelect label="Job Type" name="jobType" defaultValue={jobType} list={['all', ...Object.values(JOB_TYPE)]} onChange={(e) => {
          submit(e.currentTarget.form)
        }} />
        <FormRowSelect label="Job Status" name="jobStatus" defaultValue={jobStatus} list={['all', ...Object.values(JOB_STATUS)]} onChange={(e) => {
          submit(e.currentTarget.form)
        }} />
        <FormRowSelect label="Sort By" name="sort" defaultValue={sort} list={Object.values(JOB_SORT_BY)} onChange={(e) => {
          submit(e.currentTarget.form)
        }} />
        <Link to='/dashboard/all-jobs' className='btn form-btn delete-btn'>
          Reset Search Values
        </Link>
        {/* {temp} */}
        {/* <SubmitBtn formBtn/> */}
      </div>
    </Form>
  </Wrapper>
}

export default SearchContainer