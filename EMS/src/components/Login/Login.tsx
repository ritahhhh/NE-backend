
import LoginLeft from "./LoginLeft";
import LoginRight from "./LoginRight";
const Login= ()=>{
    return(
        <div className=" flex items-center justify-center flex-row bg-white h-full">
        <div className='w-full h-full flex flex-row justify-between  overflow-hidden '>
    
       <LoginLeft  />
       <LoginRight />
        </div>
        </div>
    )
}
export default Login;