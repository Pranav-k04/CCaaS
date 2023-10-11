import React, { useState } from 'react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isValid, setIsValid] = useState({
    email: true,
    password: true,
  });

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailIsValid = emailRegex.test(formData.email);
    const passwordIsValid = passwordRegex.test(formData.password);

    setIsValid({
      email: emailIsValid,
      password: passwordIsValid,
    });

    if (emailIsValid && passwordIsValid) {
      // Perform login logic here
      alert('Login Successful!');
      window.location.replace("/upload")
    } else {
      alert('Please enter a valid email and password.');
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
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
          {!isValid.email && (
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
          {!isValid.password && (
            <div className="error">
              Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one digit.
            </div>
          )}
        </div>
        <div>
          <button type="submit" >Login</button>
        </div>
        <div>
            Don't have Account !! <a href='/register'>Sign-Up</a>  here. 
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
