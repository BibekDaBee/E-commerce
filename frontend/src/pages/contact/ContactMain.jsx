import React, { useEffect, useState } from 'react'
import './contact.css'


const ContactMain = () => {
    const [result, setResult] = useState('');
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const key = import.meta.env.VITE_WEB3FORM_SECRET_KEY;
    // console.log(key);

    // Email submission function using web3form
    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);
    
        formData.append("access_key", key);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
              });
          
              const data = await response.json();
          
              if (data.success) {
                setResult("Form Submitted Successfully");
                event.target.reset();
              } else {
                console.log("Error", data);
                setResult(data.message);
              }
        } catch (error) {
            console.error("Submission error:", error);
            setResult("An error occurred while submitting the form.");
        }
      };
  return (
    <section className='contact'>
        <form onSubmit={onSubmit}>
            <h2>Contact form</h2>
            <div className='input-box'>
                <label>Full Name</label>
                <input type='text' className='field' placeholder='Enter your full name' name='name' required/>
            </div>
            <div className='input-box'>
                <label>Email Address</label>
                <input type='email' className='field' placeholder='Enter your email address' name='email' required/>
            </div>
            <div className='input-box'>
                <label>Message</label>
                <input type='text' className='field mess' placeholder='Enter your message' name='message' required/>
            </div>
            <button type='submit'>Send Message</button>
            {result && <p>{result}</p>}
        </form>
    </section>
  )
}

export default ContactMain