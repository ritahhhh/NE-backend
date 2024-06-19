import React,{useState} from 'react'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';

const SignupLeft = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.post('http://localhost:3001/student/signup',values);
      if (response?.status === 200) {
        setLoading(false);
        navigate('/login');
        resetForm();
      } else {
        setLoading(false);
        setError(response?.message || 'Error occurred while logging in');
      }
    } catch (submissionError) {
      setLoading(false);
      setError(submissionError?.message || 'An error occurred');
    }
  };

  const formik = useFormik({
    initialValues: { email: '', password: '', lastName:"", firstName:""},
    onSubmit: handleSubmit,
  });

  const { handleChange, handleBlur, handleSubmit: submitForm, values} = formik;
    

  return (
    
    <div className="flex flex-col items-center justify-center px-6 py-2 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0">
        
          <div className="p-6 space-y-4 md:space-y-6 sm:p-6">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight ">
              Sign Up 
            </h1>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <form className="space-y-4 md:space-y-6  gap-4 w-full h-fit " onSubmit={submitForm}>
              
             
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                  First Name
                </label>
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required=""
                />
                
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                  Last Name
                </label>
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required=""
                />
                
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                  email
                </label>
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required=""
                />
                
              </div>

             

              
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required=""
                />
                
              </div>


              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500  ">
                      Remember me
                    </label>
                  </div>
                </div>
                <a href="/" className="text-sm font-medium text-blue-600 hover:underline ">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                {loading ? 'Signing In...' : 'Sign in'}
              </button>
              <p className="text-sm font-light text-gray-500">
                Already have an account yet?{' '}
                <a href="/" className="font-medium  hover:underline text-blue-500 ">
                  Register
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
  );
};

export default SignupLeft;
