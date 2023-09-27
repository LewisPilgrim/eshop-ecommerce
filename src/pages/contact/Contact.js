import React, { useRef } from 'react'
import styles from './Contact.module.scss'
import Card from "../../components/card/Card"
import { FaEnvelope, FaPhoneAlt, FaTwitter } from 'react-icons/fa'
import { GoLocation } from "react-icons/go"
import emailjs from "@emailjs/browser"
import { toast } from 'react-toastify'

const Contact = () => {
  const form = useRef()

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, 'template_1kyc44y', form.current, 'TXiaZ61rrVlTTaVpx')
      .then((result) => {
          toast.success("Message sent successfully")
      }, (error) => {
          toast.error(error.message)
      });
      e.target.reset()
  }

  return (
    <section>
      <div className={`container ${styles.contact}`}>
      <h2>Contact Us</h2>
      <div className={styles.section}>
        <form onSubmit={sendEmail} ref={form}>
          <Card cardClass={styles.card}>
            <label>Name: </label>
            <input type="text" name="user_name" placeholder="Full Name" required />
            <label>Email: </label>
            <input type="email" name="user_email" placeholder="Your active email" required />
            <label>Subject: </label>
            <input type="text" name="subject" placeholder="Subject" required />
            <label>Your Message: </label>
            <textarea name="message" cols="30" rows="10"></textarea>
            <button type="submit" className='--btn --btn-primary'>Send Message</button>
          </Card>
        </form>
        <div className={styles.details}>
          <Card cardClass={styles.card2}>
            <h3>Our Contact Information</h3>
            <p>Fill the form or contact us via other channels listed below</p>
            <div className={styles.icons}>
              <span>
                <FaPhoneAlt />
                <p>+44 705 141 6545</p>
              </span>
              <span>
                <FaEnvelope />
                <p>support@eshop.com</p>
              </span>
              <span>
                <GoLocation />
                <p>London, England</p>
              </span>
              <span>
                <FaTwitter />
                <p>@EShop</p>
              </span>
            </div>
          </Card>
        </div>
      </div>
      </div>
    </section>
  )
}

export default Contact
