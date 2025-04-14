import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { getCartTotal } from "../firebase";
import { AuthContext } from "../context/AuthProvider";

function Checkout() {
  
  const [checkoutData, setCheckoutData] = useState({
    // Address details
    fullName: "",
    address: "",
    phoneNumber: "",
    
    // Payment details
    cardHolder: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const {currentUser} = useContext(AuthContext)
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCheckoutData({
      ...checkoutData,
      [name]: value,
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  // Handle card number formatting
  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCheckoutData({
      ...checkoutData,
      cardNumber: formattedValue,
    });
    
    if (errors.cardNumber) {
      setErrors({
        ...errors,
        cardNumber: "",
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Validate address section
    if (!checkoutData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
    if (!checkoutData.address.trim()) {
      newErrors.address = "Address is required";
    }
    
    if (!checkoutData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(checkoutData.phoneNumber.replace(/\D/g, ""))) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }
    
    // Validate payment section
    if (!checkoutData.cardHolder.trim()) {
      newErrors.cardHolder = "Card holder name is required";
    }
    
    if (!checkoutData.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
    } else if (checkoutData.cardNumber.replace(/\s/g, "").length !== 16) {
      newErrors.cardNumber = "Please enter a valid 16-digit card number";
    }
    
    if (!checkoutData.expiryDate.trim()) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(checkoutData.expiryDate)) {
      newErrors.expiryDate = "Please use MM/YY format";
    }
    
    if (!checkoutData.cvv.trim()) {
      newErrors.cvv = "CVV is required";
    } else if (!/^[0-9]{3,4}$/.test(checkoutData.cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Reset form and show success
        setCheckoutData({
          fullName: "",
          address: "",
          phoneNumber: "",
          cardHolder: "",
          cardNumber: "",
          expiryDate: "",
          cvv: "",
        });

        alert("Purchasing is not yet Available!");

    } catch (error) {
        console.error("Something went wrong: ", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() =>{
    const fetchTotal = async () =>{
        try {
            const total = await getCartTotal(currentUser.uid)
            setTotalAmount(total);
        } catch (error) {
            console.error("error fetching total: ", error);      
        }


    }

    fetchTotal();
  }, [])



  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Checkout</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Address Section */}
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Shipping Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={checkoutData.fullName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                        errors.fullName ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={checkoutData.address}
                      onChange={handleChange}
                      rows="3"
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                        errors.address ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="123 Main St, City, Country"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={checkoutData.phoneNumber}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                        errors.phoneNumber ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="(123) 456-7890"
                    />
                    {errors.phoneNumber && (
                      <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Payment Section */}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700 mb-1">
                      Card Holder Name
                    </label>
                    <input
                      type="text"
                      id="cardHolder"
                      name="cardHolder"
                      value={checkoutData.cardHolder}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                        errors.cardHolder ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.cardHolder && (
                      <p className="mt-1 text-sm text-red-600">{errors.cardHolder}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={checkoutData.cardNumber}
                      onChange={handleCardNumberChange}
                      maxLength="19"
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                        errors.cardNumber ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="0000 0000 0000 0000"
                    />
                    {errors.cardNumber && (
                      <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={checkoutData.expiryDate}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                          errors.expiryDate ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="MM/YY"
                        maxLength="5"
                      />
                      {errors.expiryDate && (
                        <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={checkoutData.cvv}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                          errors.cvv ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="123"
                        maxLength="4"
                      />
                      {errors.cvv && (
                        <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Complete Purchase"
                  )}
                </button>
              </div>
            </form>
          </div>
          
          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
              
              <div className="space-y-4 border-b border-gray-200 pb-4 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${totalAmount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">$0.00</span>
                </div>

              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-800">Total</span>
                <span className="text-lg font-bold text-blue-600">${totalAmount}</span>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Estimated delivery</span>
                  <span className="font-medium">April 15-17, 2025</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-green-600"/>
                  <span>Secure checkout</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-600"/>
                    <span>Free returns within 30 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;