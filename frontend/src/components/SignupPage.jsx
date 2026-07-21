import React, { useState } from 'react'
import { signUpStyles } from '../assets/dummyStyles'
import { toast, ToastContainer } from 'react-toastify'
import { ArrowLeft, Clapperboard, Lock, Mail, Phone, Ticket, User, Eye, EyeOff, Film, Calendar } from 'lucide-react';

const SignupPage = () => {

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData((prevState) => ({
        ...prevState,
        [name]: value,
    }));

    if(errors[name]){
        setErrors((prev)=> ({
            ...prev,
            [name]: "",
        }));
    }
  };

  //functions to validate all fields
  const validateForm = () => {
    const newErrors = {};

    if(!formData.fullName.trim()){
        newErrors.fullName = "Full name is required";
    }else if(formData.fullName.length < 2){
        newErrors.fullName = "Full name must be at least 2 characters"
    }

    if(!formData.username.trim()){
        newErrors.username = "Username is required";
    }else if(formData.username.length < 3){
        newErrors.username = "Username must be at least 3 characters"
    }

    if(!formData.email.trim()){
        newErrors.email = "Email is required";
    }else if(!/\S+@\S+\.\S+/.test(formData.email)){
        newErrors.email = "Email is invalid"
    }

    if(!formData.phone.trim()){
        newErrors.phone = "Phone number is required";
    }else if(!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))){
        newErrors.phone = "Phone number must be 10 digits"
    }

    if(!formData.dateOfBirth){
        newErrors.dateOfBirth = "Date of birth is required";
    }else if(new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear() < 15){
        newErrors.dateOfBirth = "Age must be at least 15 years";
    }

    if(!formData.password){
        newErrors.password = "Password is required";
    }else if(formData.password.length < 6){
        newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  const goBack = () => {
    window.history.back()
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if(!validateForm()){
        toast.error("Please fix the form errors.");
        return;
    }

    console.log("Form Data :", {
        ...formData,
        password: "***" + formData.password.slice(-2),
    });
    setIsLoading(true);

    setTimeout(() => {
        setIsLoading(false);
        toast.success("Account created successfully! Redirecting to Login...");

        setTimeout(() => {
            window.location.href = "/login"
        }, 2000);
    }, 1500);
  };


  return (
    <div className={signUpStyles.container}>
      <div className={signUpStyles.particlesContainer}>
        {[...Array(15)].map((_,i) => (
            <div
             key={i}
             className={signUpStyles.particle}
             style={{
                left: `${Math.random() *100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 4}s`
             }}
             >
            </div>
        ))}
      </div>

      <div className={signUpStyles.gradientOrbs}>
        <div className={signUpStyles.orb1}></div>
        <div className={signUpStyles.orb2}></div>
      </div>

      <ToastContainer
      position='top-right'
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='dark'
      />

    <div className={signUpStyles.mainContent}>
        <button onClick={goBack} className={signUpStyles.backButton}>
            <ArrowLeft size={20} className={signUpStyles.backIcon} />
            <span className={signUpStyles.backText}>BACK</span>
        </button>
    

    <div className={signUpStyles.card}>
        <div className={signUpStyles.cardHeader}></div>

        <div className={signUpStyles.cardContent}>
            <div className={signUpStyles.header}>
                <div className={signUpStyles.headerFlex}>
                    <Ticket className={signUpStyles.headerIcon} size={32} />
                    <h2 className={signUpStyles.headerTitle}>JOIN OUR CINEMA</h2>
                </div>
                <p className={signUpStyles.headerSubtitle}>
                    Create your account and start your cinematic journey.
                </p>
            </div>
               
        <form onSubmit={handleSubmit} className={signUpStyles.form}>
            <div className={signUpStyles.formGrid}>
                <div>
                    <label htmlFor="fullName" className={signUpStyles.field}>
                        FULL NAME
                    </label>
                    <div className={signUpStyles.inputContainer}>
                        <input 
                        type="text" 
                        name="fullName" 
                        id="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`${signUpStyles.input.base} ${
                            errors.fullName ?
                            signUpStyles.input.error :
                            signUpStyles.input.normal
                        } ${signUpStyles.inputWithIcon}`}
                        placeholder='Enter your Full Name'
                        />
                        <div className={signUpStyles.inputIcon}>
                            <User size={18} />
                        </div>
                    </div>
                    {errors.fullName && (
                        <p className={signUpStyles.errorText}>{errors.fullName}</p>
                    )}
                </div>

                 <div>
                    <label htmlFor="username" className={signUpStyles.field}>
                        USERNAME
                    </label>
                    <div className={signUpStyles.inputContainer}>
                        <input 
                        type="text" 
                        name="username" 
                        id="username"
                        required
                        value={formData.username}
                        onChange={handleChange}
                        className={`${signUpStyles.input.base} ${
                            errors.username ?
                            signUpStyles.input.error :
                            signUpStyles.input.normal
                        } ${signUpStyles.inputWithIcon}`}
                        placeholder='Choose a username'
                        />
                        <div className={signUpStyles.inputIcon}>
                            <Clapperboard size={18} />
                        </div>
                    </div>
                    {errors.username && (
                        <p className={signUpStyles.errorText}>{errors.username}</p>
                    )}
                </div>
                </div>

                <div className={signUpStyles.formGrid}>
                     <div>
                    <label htmlFor="email" className={signUpStyles.field}>
                        EMAIL
                    </label>
                    <div className={signUpStyles.inputContainer}>
                        <input 
                        type="email" 
                        name="email" 
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={`${signUpStyles.input.base} ${
                            errors.email ?
                            signUpStyles.input.error :
                            signUpStyles.input.normal
                        } ${signUpStyles.inputWithIcon}`}
                        placeholder='your@example.com'
                        />
                        <div className={signUpStyles.inputIcon}>
                            <Mail size={18} />
                        </div>
                    </div>
                    {errors.email && (
                        <p className={signUpStyles.errorText}>{errors.email}</p>
                    )}
                </div>
                
                  <div>
                    <label htmlFor="phone" className={signUpStyles.field}>
                        PHONE NUMBER
                    </label>
                    <div className={signUpStyles.inputContainer}>
                        <input 
                        type="tel" 
                        name="phone" 
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className={`${signUpStyles.input.base} ${
                            errors.phone ?
                            signUpStyles.input.error :
                            signUpStyles.input.normal
                        } ${signUpStyles.inputWithIcon}`}
                        placeholder='+1 (555) 23-4567'
                        />
                        <div className={signUpStyles.inputIcon}>
                            <Phone size={18} />
                        </div>
                    </div>
                    {errors.phone && (
                        <p className={signUpStyles.errorText}>{errors.phone}</p>
                    )}
                </div>
            </div>

            <div className={signUpStyles.formGrid}>
               <div>
                    <label htmlFor="dateOfBirth" className={signUpStyles.field}>
                        DATE OF BIRTH
                    </label>
                    <div className={signUpStyles.inputContainer}>
                        <input 
                        type="date"
                        name="dateOfBirth" 
                        id="dateOfBirth"
                        required
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className={`${signUpStyles.input.base} ${
                            errors.dateOfBirth ?
                            signUpStyles.input.error :
                            signUpStyles.input.normal
                        } ${signUpStyles.inputWithToggle}`}
                        placeholder='DD-MM-YYYY'
                        />
                        <div className={signUpStyles.inputIcon}>
                            <Calendar size={18} />
                        </div>
                    </div>
                    {errors.dateOfBirth && (
                        <p className={signUpStyles.errorText}>{errors.dateOfBirth}</p>
                    )}
                </div>
             

                <div>
                    <label htmlFor="password" className={signUpStyles.field}>
                        PASSWORD
                    </label>
                    <div className={signUpStyles.inputContainer}>
                        <input 
                        type={showPassword ? "text" : "password"}
                        name="password" 
                        id="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className={`${signUpStyles.input.base} ${
                            errors.password ?
                            signUpStyles.input.error :
                            signUpStyles.input.normal
                        } ${signUpStyles.inputWithToggle}`}
                        placeholder='Create a strong password'
                        />
                        <div className={signUpStyles.inputIcon}>
                            <Lock size={18} />
                        </div>
                        <button type='button' className={signUpStyles.passwordToggle} onClick={()=> setShowPassword(!showPassword)}>
                            {showPassword ? (
                                <EyeOff size={18} className={signUpStyles.passwordToggleIcon} />
                            ): (
                                <Eye size={18} className={signUpStyles.passwordToggleIcon} />
                            )}
                         </button>
                    </div>
                    {errors.password && (
                        <p className={signUpStyles.errorText}>{errors.password}</p>
                    )}
                </div>
            </div>

            <div className={signUpStyles.submitContainer}>
                <button
                type='button'
                disabled={isLoading}
                className={`${signUpStyles.submitButton.base} ${
                    isLoading ? signUpStyles.submitButton.loading : ""
                }`}
                >
                    {isLoading ? (
                        <div className={signUpStyles.submitContent}>
                            <div className={signUpStyles.loadingSpinner}></div>
                            CREATING YOUR ACCOUNT...
                        </div>
                    ): (
                        <div className={signUpStyles.submitContent}>
                            <Film className={signUpStyles.submitIcon} size={20} />
                            <span className='font-cinema'>CREATE CINEMA ACCOUNT</span>
                        </div>
                    )}
                </button>
            </div>
        </form>

        <div className={signUpStyles.loginContainer}>
            <p className={signUpStyles.loginText}>
                Already have an account?{" "}
                <a href="/login" className={signUpStyles.loginLink}>
                Sign in to your account
                </a>
            </p>
        </div>
        </div>
    </div>
    </div>
    </div>
  )
}

export default SignupPage
