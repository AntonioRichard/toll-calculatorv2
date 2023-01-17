import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faMapMarker } from '@fortawesome/free-solid-svg-icons'

const ContactPage = ()=> (
    <div className="container-content">
    <div className="content">
      <div className="left-side">
        <div className="address details">
          <i className="fas fa-map-marker-alt"></i>
          <div className="topic">Address</div>
          <FontAwesomeIcon icon={faMapMarker} size="lg" />
          <div className="text-one">Timis</div>
          <div className="text-two">Timisoara</div>
        </div>
        <div className="phone details">
          <FontAwesomeIcon icon={faPhone} size="lg" />
          <div className="topic">Phone</div>
          <div className="text-one"></div>
          <div className="text-two"></div>
        </div>
        <div className="email details">
          <FontAwesomeIcon icon={faEnvelope} size="lg"/>
          <div className="topic">Email</div>
          <div className="text-one">contact@gmail.com</div>
          <div className="text-two"></div>
        </div>
      </div>
      <div className="right-side">
        <div className="topic-text">Send us a message</div>
      <form action="#">
        <div className="input-box">
          <input type="text" placeholder="Enter your name" />
        </div>
        <div className="input-box">
          <input type="text" placeholder="Enter your email" />
        </div>
        <div className="input-box message-box">
          <input type="textarea" placeholder="Enter your message"/>
        </div>
          <input className="send-btn" type="button" value="Send Now" />
      </form>
    </div>
    </div>
  </div>
);

export default ContactPage;
