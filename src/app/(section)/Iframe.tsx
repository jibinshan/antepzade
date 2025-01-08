import React from "react";

const Iframe: React.FC = () => {
  return (
    <section
      className="w-full h-fit">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.417762841503!2d-73.99581902473457!3d40.75283547138749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259adc1afce95%3A0x7b5d1d6a13472f6f!2s487%208th%20Ave%2C%20New%20York%2C%20NY%2010001%2C%20USA!5e0!3m2!1sen!2sin!4v1736337465828!5m2!1sen!2sin"
        width="600"
        height="450"
        style={{ border: '0px' }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-[50vh] grayscale invert"
      ></iframe>
    </section >
  );
};

export default Iframe;
