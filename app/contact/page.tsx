import ContactForm from "@/src/blocks/Contact/contactForm";
import React from "react";

const ContactPage = () => {
  return (
    <section id="contact-page" className="py-32 px-8">
      <div className="container">
        <div className="flex lg:gap-20 max-w-[1280px] mx-auto">
          <div className="flex flex-col items-center lg:items-start justify-between w-full max-w-96 mx-auto text-center lg:text-left">
            <div>
              <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
                Contact Us
              </h1>
              <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
                We are available for questions, feedback, or collaboration opportunities. 
                Let us know how we can help!
              </p>
            </div>
            <div className="mb-8">
              <h2 className="mb-5 text-2xl font-bold text-left">Contact Details</h2>
              <ul className="flex flex-col ml-4 list-disc">
                <li className="">
                  <span className="font-bold">Phone: </span>(+33) 6 12 34 56 78
                </li>
                <li className="">
                  <span className="font-bold">Email: </span><a href="mailto:" className="underline">your-email@example.com</a>
                </li>
              </ul>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
