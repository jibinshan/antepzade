import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="h-full w-full bg-black px-4 py-8 text-white md:px-24 md:py-20">
      <div className="flex flex-col gap-8">
        {/* Logo with Lines */}
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
          <Image
            src="/images/home/footer/b-line.svg"
            width={258}
            height={5}
            alt="b-line"
            className="h-[5px] w-[268px] md:w-[45%]"
          />
          <Image
            src="/images/home/footer/logo.svg"
            width={58}
            height={45}
            alt="logo"
            className="h-[85px] w-[118px]"
          />
          <Image
            src="/images/home/footer/b-line.svg"
            width={258}
            height={5}
            alt="b-line"
            className="h-[5px] w-[268px] md:w-[45%]"
          />
        </div>

        {/* Center Section */}
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex flex-col items-center gap-12 md:w-1/2 md:flex-row md:items-start md:justify-center">
            {/* Contact Section */}
            <div className="flex flex-col items-center gap-4 md:items-start">
              <h3 className="font-josefin_sans text-xl font-[400] tracking-[1.2px] text-white">
                Contact
              </h3>
              <Image
                src="/images/home/footer/s-line.svg"
                width={118}
                height={5}
                alt="s-line"
                className="h-[5px] w-[118px]"
              />
              <address className="text-center font-josefin_sans text-lg font-[300] not-italic leading-[25px] text-white md:text-left">
                Eight Avenue 487, New York <br />
                +387 643 932 728 <br />
                <Link
                  href="mailto:antepzade@example.com"
                  className="text-white hover:underline"
                >
                  antepzade@example.com
                </Link>
              </address>
            </div>

            {/* Opening Hours */}
            <div className="flex flex-col items-center gap-4 md:items-start">
              <h3 className="font-josefin_sans text-xl font-[400] tracking-[1.2px] text-white">
                Opening Hours
              </h3>
              <Image
                src="/images/home/footer/s-line.svg"
                width={118}
                height={5}
                alt="s-line"
                className="h-[5px] w-[118px]"
              />
              <p className="text-center font-josefin_sans text-lg font-[300] not-italic leading-[25px] text-white md:text-left">
                Mon-Thurs: 4 PM - 12 AM <br />
                Fri-Sat: 4 PM - 2 AM <br />
                Sun: 4 PM - 12 AM
              </p>
            </div>
          </div>

          <div className="ml-[6%] hidden md:block">
            <Image
              src="/images/home/footer/c-line.png"
              width={4}
              height={218}
              alt="vertical-line"
              className="h-[218px] w-[4px]"
            />
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-12 md:ml-16 md:w-1/2 md:flex-row md:gap-44">
            <nav className="flex flex-col items-center gap-2 md:mt-4 md:items-start md:gap-4">
              <Link
                href="#"
                className="font-josefin_sans text-lg font-[300] text-white hover:underline"
              >
                Home
              </Link>
              <Link
                href="#"
                className="font-josefin_sans text-lg font-[300] text-white hover:underline"
              >
                About Us
              </Link>
              <Link
                href="#"
                className="font-josefin_sans text-lg font-[300] text-white hover:underline"
              >
                Gallery
              </Link>
              <Link
                href="#"
                className="font-josefin_sans text-lg font-[300] text-white hover:underline"
              >
                Virtual Tour
              </Link>
              <Link
                href="#"
                className="font-josefin_sans text-lg font-[300] text-white hover:underline"
              >
                Contact Us
              </Link>
            </nav>
            <div className="flex flex-col items-center justify-center gap-2 md:items-start">
              <p className="text-center font-josefin_sans text-lg font-[400] tracking-[0.95px] text-white">
                Call Us For Your Orders <br />
                020 8802 5585
              </p>
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex flex-row items-center justify-center gap-6">
          <Link href="#" aria-label="Twitter">
            <Image
              src="/images/home/footer/twiter.png"
              width={25}
              height={25}
              alt="Twitter"
              className="h-[25px] w-[25px]"
            />
          </Link>
          <Link href="#" aria-label="Instagram">
            <Image
              src="/images/home/footer/insta.png"
              width={25}
              height={25}
              alt="Instagram"
              className="h-[25px] w-[25px]"
            />
          </Link>
          <Link href="#" aria-label="YouTube">
            <Image
              src="/images/home/footer/youtube.png"
              width={25}
              height={25}
              alt="YouTube"
              className="h-[25px] w-[25px]"
            />
          </Link>
          <Link href="#" aria-label="LinkedIn">
            <Image
              src="/images/home/footer/linkdin.png"
              width={25}
              height={25}
              alt="LinkedIn"
              className="h-[23px] w-[25px]"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
