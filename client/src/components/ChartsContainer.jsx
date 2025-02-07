import { useState } from 'react';

import BarChart from './BarChart';
import AreaChartComponent from './AreaChart';
import BarChartContainer from './BarChart' 
import Wrapper from '../assets/wrappers/ChartsContainer';


const ChartsContainer = ({data}) => {
    const [barChart, setBarChart] = useState(true)

    return <Wrapper>
        <h4>Monthly Applications</h4>
        <button type="button" onClick={()=>setBarChart(!barChart)}>
            {barChart?'Area Chart':'Bar Chart'}
        </button>
        {barChart?<BarChartContainer data={data}/>:<AreaChartComponent data={data}/>}
    </Wrapper>
}

export default ChartsContainer