import Wrapper from "../assets/wrappers/LandingPage"
import main from '../assets/images/main.svg'
import logo from '../assets/images/logo.svg'
import { Link } from "react-router-dom"
import { Logo } from "../components"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
const Landing = () => {
  const navigate = useNavigate()

  const userId = localStorage.getItem("userId")

  useEffect(()=>{
    if(userId){
      navigate('/dashboard')
    }
  },[navigate,userId])
  return (
    <Wrapper>
      <nav>
        <Logo/>
      </nav>
      <div className="container page">
        <div className="info">
          <h1>Job <span>Tracking</span> App</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
            a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, 
            remaining essentially unchanged.
          </p>
          <Link to='/register' className='btn register-link'>Register</Link>
          <Link to='/login' className='btn'>Login / Demo User</Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img"/>
      </div>
    </Wrapper>
  )
}

// const Wrapper = styled.div`
//   background: red;
//   h1{
//     color: white;
//   }
//   .content{
//     background-color: blue;
//     color: yellow;
//   }
// `

export default Landing