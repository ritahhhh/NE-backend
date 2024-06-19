
import SignupLeft from "./SignupLeft";
import SignupRight from "./SignupRight";
const Signup=()=>{
    return(

      <div className=" flex flex-col items-center justify-center flex-row bg-white h-full">
        <div className='w-9/12 h-[87.5%] flex flex-row overflow-hidden '>
            <SignupRight />
            <SignupLeft />
            </div>
            </div>
    )
};
export default Signup;