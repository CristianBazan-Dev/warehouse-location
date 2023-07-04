import React from "react";
import "./about.css";
import {ReactComponent as Logo} from '../../../assets/logo.svg'
import {ReactComponent as Isologo} from '../../../assets/isologo.svg'
import {ReactComponent as Icon } from '../../../assets/icon.svg'

function AboutUs(props) {
  return (
    <div className="aboutUs">
      <h1>Who we are?</h1>
      <div className="subtitle">
        <h2>Welcome to <Logo />!</h2>
      </div>

      <div className="presentation">
        <h2>
          We’re a family owned and operated furniture provider specializing in
          quality, exceptional service, and a remarkable selection of beautiful
          and functional furniture.{" "}
        </h2>
        
        <img
          src="https://asset20.ckassets.com/blog/wp-content/uploads/sites/5/2021/10/Furnitre.jpg"
          alt=""
        />

       <img src="https://i.shgcdn.com/f2446e77-5622-4a49-b9e1-9404cc9eb181/-/format/auto/-/preview/3000x3000/-/quality/lighter/" alt="" />  

        <div className="description">
     
          <h3>
            Our mission statement is to provide the best furniture shopping
            experience possible for our customers. What sets us apart is our
            commitment to providing the latest designs in furniture, along with
            unbeatable customer service.
          </h3>

          <Icon className="icon"/> 

          <p>
            We strive to make sure each and every customer is 100% satisfied
            with theirpurchase. At Forniture Company Name, we want our customers
            to be happy and confident with their furniture purchase. That’s why
            we offer a full line of furniture, from luxurious sofas to
            convenient outdoor seating. We also include delivery options, so
            that you won’t have to worry about the tricky parts of shopping for
            furniture.
          </p>
          <p>
            In addition to our wide selection of quality furniture, we also
            offer custom designs. We believe that furniture should be tailored
            to our customers’ personalities and needs. That’s why we offer
            customizable options for every piece. We are passionate about the
            furniture we provide, and we stand behind every product we sell.
          </p>
          <p>
            We are committed to finding the perfect pieces to bring comfort and
            style into your home. Thank you for choosing Forniture Company Name!
            We look forward to helping you find the perfect furniture for your
            home.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
