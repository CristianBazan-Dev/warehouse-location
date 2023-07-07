import React from "react";
import './contact.css'
function Contact(props) {
    const handleChange = (e) => {

    }

    const handleSubmit = (e) => {

    }

  return (
    <div className="contact-us">
      <div className="title-contact">
      <h2>Contact us!</h2>
      </div>
      
      <form
        action=""
        onSubmit={handleSubmit}
        className="w-full max-w-xs m-auto relative top-10"
      > 
        <div className="mb-4">

          <input
            type="text"
            className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
            name="fullname"
            placeholder="Full name"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
            name="subject"
            placeholder="Subject"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
            name="email"
            placeholder="E-mail"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <textarea
            type="text"
            className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
            name="country"
            onChange={handleChange}
            placeholder="Message"
          />
        </div>


        <button className="bg-indigo-500 px-3 py-2 mt-10 mb-10 w-full">Send</button>

      </form>

    </div>
  );
}

export default Contact;
