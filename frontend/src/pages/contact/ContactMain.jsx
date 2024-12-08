import React, { useEffect, useState } from "react";
import "./contact.css";
import Swal from "sweetalert2";

const ContactMain = () => {
  const [result, setResult] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const key = import.meta.env.VITE_WEB3FORM_SECRET_KEY;
  // console.log(key);
  if (!key) {
    console.error(
      "VITE_WEB3FORM_SECRET_KEY is not defined in the environment variables."
    );
  }

  // Email submission function using web3form
  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", key);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset();
        Swal.fire({
          title: "Success!",
          text: "Message send Successfully!",
          icon: "success",
        });
      } else {
        console.log("Error", data);
        setResult(data.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setResult("An error occurred while submitting the form.");
    }
  };
  return (
    <section className="contact flex flex-col">
      <form onSubmit={onSubmit}>
        <h2>Contact form</h2>
        <div className="input-box">
          <label>Full Name</label>
          <input
            type="text"
            className="field"
            placeholder="Enter your full name"
            name="name"
            required
          />
        </div>
        <div className="input-box">
          <label>Email Address</label>
          <input
            type="email"
            className="field"
            placeholder="Enter your email address"
            name="email"
            required
          />
        </div>
        <div className="input-box">
          <label>Message</label>
          <textarea
            id="message"
            className="field mess"
            placeholder="Enter your message"
            name="message"
            required
          />
        </div>
        <button type="submit">Send Message</button>
        {result && <p>{result}</p>}
      </form>
      <div>
      If you like my project, Please feel free to contact me! 
      </div>
    </section>
  );
};

export default ContactMain;
