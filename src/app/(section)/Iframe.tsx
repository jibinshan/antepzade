import React from "react";

const Iframe: React.FC = () => {
  return (
    <section
      className="h-[45vh] w-full px-4 py-12 md:px-32 md:py-24"
      style={{
        backgroundImage: "url('/images/home/iframe/iframe.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <iframe src="" title="Embedded Content"></iframe>
    </section>
  );
};

export default Iframe;
