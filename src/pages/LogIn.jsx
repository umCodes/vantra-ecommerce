import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthProvider';




function Login() {
    const {logIn} = useContext(AuthContext);
    const navigateTo = useNavigate();
    const [formData, setFormData] = useState({
    email: '',
    password: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Simple validation
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }

    
    // Here you would typically handle the login API call
    const loginSuccess = await logIn(formData.email, formData.password);
    
    if(!loginSuccess)
        setErrors(prev => ({...prev, password: "Invalid credentials"}));
    };

    return (
        <div className="min-h-screen flex flex-col">
          
          
          <main className=" flex-1 flex items-center justify-center p-4">
            <div className="w-full max-w-md p-8 border border-black bg-white">
              <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  
                  {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
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
                  {errors.password && <p className="text-red-500 mt-1">{errors.password}</p>}
                </div>
                
                <button
                  type="submit"
                  className="w-full p-2 bg-black text-white font-medium"
                >
                  Login
                </button>
              </form>
              
              <div className="mt-6 text-center">
                <p>Don't have an account?</p>
                <button 
                  onClick={() => navigateTo('/register')}
                  className="text-black underline mt-2"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </main>
          
          <footer className="bg-black text-white p-4 text-center">
            <p>&copy; 2025 My Application. All rights reserved.</p>
          </footer>
        </div>
      );
}


export default Login;
