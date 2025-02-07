import React from 'react'
import Wrapper from '../assets/wrappers/JobsContainer'
import { useAllJobsContext } from '../pages/AllJobs'
import Job from './Job';
import PageBtnContainer from './PageBtnContainer';

const JobsContainer = () => {

    const {data} = useAllJobsContext();
    const {jobs,noOfPages,totalJobs} = data
    if(jobs.length==0){
        return <Wrapper>
            <h2>No jobs to display</h2>
        </Wrapper>
    }
  return (
    <Wrapper>
        <h5>
            {totalJobs} job{totalJobs>1 && 's'} found
        </h5>
        <div className="jobs">
            {jobs.map((job)=>{
                return <Job key={job._id} {...job}/>;
            })}
        </div>
        {noOfPages>1 && <PageBtnContainer/>}
    </Wrapper>
  )
}

export default JobsContainer