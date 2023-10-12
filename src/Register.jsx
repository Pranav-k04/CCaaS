import { useEffect, useState } from 'react';
import axios from "axios"

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
  });

  const [isValid, setIsValid] = useState({
    fullName: true,
    email: true,
    password: true,
    phoneNumber: true, // Add phone number validation
  });

  const [isSubmitted, setIsSubmitted] = useState(false); // New state for form submission

  useEffect(() => {
    if (isSubmitted) {
      const fullNameRegex = /^[A-Za-z\s]+$/;
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      const phoneRegex = /^[0-9]{10}$/;

      const fullNameIsValid = fullNameRegex.test(formData.fullName);
      const emailIsValid = emailRegex.test(formData.email);
      const passwordIsValid = passwordRegex.test(formData.password);
      const phoneIsValid = phoneRegex.test(formData.phoneNumber); // Validate phone number

      setIsValid({
        fullName: fullNameIsValid,
        email: emailIsValid,
        password: passwordIsValid,
        phoneNumber:phoneIsValid,
      });
    }
  }, [formData, isSubmitted]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true); // Set form as submitted

    if (isValid.fullName && isValid.email && isValid.password) {
      const r = structuredClone(formData)
      console.log(r)
      r.name = formData.fullName
      r.phone = r.phoneNumber
      await axios.post(import.meta.env.VITE_SERVER_IP+"/user/signup", r).then(res => {
        if(res.data?.status_code >= 400) {
          setFormData({
            fullName: '',
            email: '',
            password: '',
            phoneNumber: '', // Add phone number state
          })
          setIsValid({
            fullName: true,
            email: true,
            password: true,
            phoneNumber: true, // Add phone number validation
          })
          alert("Server error please try again")
          return
        }
        localStorage.setItem("signup-email", res.data.email)
        window.location.reload("/register/verify")

      })
    } else {
      alert('Please fill out the form correctly.');
    }
  };

  return (
    <div>
      <h2>Registration Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
          {isSubmitted && !isValid.fullName && (
            <div className="error">Please enter a valid full name.</div>
          )}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          {isSubmitted && !isValid.email && (
            <div className="error">Please enter a valid email address.</div>
          )}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          {isSubmitted && !isValid.password && (
            <div className="error">
              Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one digit.
            </div>
          )}
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
          {isSubmitted && !isValid.phoneNumber && (
            <div className="error">Please enter a valid 10-digit phone number.</div>
          )}
        </div>
        <div>
          <button type="submit" disabled={!isValid.fullName || !isValid.email || !isValid.password}>
            Register
          </button>
        </div>
        <div>
          Already have an account !! <a href='/login'>Login</a> here.
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;
