import React from 'react'
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../footer/Footer.jsx";
import img1 from '../../assets/2.jpg'
import '../Contact/contact.css'

function Contact() {
  return (
    <>
      <Navbar/>
      <div className="contact">
      <div
        className="leftSide"
        style={{ backgroundImage: `url(${img1})` }}
      ></div>
      <div className="rightSide">
        <h1> Contact Us</h1>

        <form id="contact-form" method="POST" className='f2'>
          <label htmlFor="name">Full Name</label>
          <input name="name" placeholder="Enter full name..." type="text" required />
          <label htmlFor="email">Email</label>
          <input name="email" placeholder="Enter email..." type="email" required/>
          <label htmlFor="message">Message</label>
          <textarea
            rows="6"
            placeholder="Enter message..."
            name="message"
            required
          ></textarea>
          <button type="submit"> Send Message</button>
        </form>
      </div>
    </div>
      <Footer/>
    </>
  )
}

export default Contact
