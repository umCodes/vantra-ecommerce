import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";



function SignUp() {
    const navigateTo = useNavigate();
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    const { signUp } = useContext(AuthContext)
    const [errors, setErrors] = useState({});
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      const newErrors = {};
      
      // Simple validation
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.password) newErrors.password = "Password is required";
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      
      // Here you would typically handle the signup API call
      signUp(formData.firstName, formData.lastName, formData.email, formData.password)
    };
    
    return (
        <div className="min-h-screen flex flex-col">
          
          <main className="flex-1 flex items-center justify-center p-4">
            <div className="w-full max-w-md p-8 border border-black bg-white">
              <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="firstName" className="block mb-1 font-medium">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-2 border border-black focus:outline-none focus:border-2"
                  />
                  {errors.firstName && <p className="text-black mt-1">{errors.firstName}</p>}
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block mb-1 font-medium">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full p-2 border border-black focus:outline-none focus:border-2"
                  />
                  {errors.lastName && <p className="text-black mt-1">{errors.lastName}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-1 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-black focus:outline-none focus:border-2"
                  />
                  {errors.email && <p className="text-black mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <label htmlFor="password" className="block mb-1 font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 border border-black focus:outline-none focus:border-2"
                  />
                  {errors.password && <p className="text-black mt-1">{errors.password}</p>}
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block mb-1 font-medium">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full p-2 border border-black focus:outline-none focus:border-2"
                  />
                  {errors.confirmPassword && (
                    <p className="text-black mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  className="w-full p-2 bg-black text-white font-medium"
                >
                  Create Account
                </button>
              </form>
              
              <div className="mt-6 text-center">
                <p>Already have an account?</p>
                <button 
                  onClick={() => navigateTo('/login')}
                  className="text-black underline mt-2"
                >
                  Login
                </button>
              </div>
            </div>
          </main>
          

        </div>
      );
  }


export default SignUp;