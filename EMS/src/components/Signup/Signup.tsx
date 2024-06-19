
import SignupLeft from "./SignupLeft";
import SignupRight from "./SignupRight";
const Signup=()=>{
    return(

      <div className=" flex flex-col items-center justify-center flex-row bg-white h-full">
        <div className='w-full h-full flex flex-row justify-between overflow-hidden '>
            <SignupRight />
            <SignupLeft />
            </div>
            </div>
    )
};
export default Signup;