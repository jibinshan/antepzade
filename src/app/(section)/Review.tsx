"use client";
import { Icons } from "@/components/Icon";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRestaurant } from "@/context/RestaurantContext";
import Image from "next/image";

const Reviews = ({}) => {
  const { reviews } = useRestaurant();
  return (
    <section className="relative mb-8 flex h-full w-full justify-center bg-transparent md:mb-0">
      <div className="flex h-full w-full max-w-[1300px] flex-col items-start justify-center gap-4 py-12 md:py-44 md:pt-24">
        <div className="flex h-full w-full flex-col items-center justify-center gap-0">
          <h3 className="font-italiana w-full text-center text-2xl font-[400] uppercase tracking-[1.82px] text-black">
            Our Clients Say
          </h3>
          <Image
            src="/images/home/footer/underline.png"
            width={391}
            height={50}
            alt="frame"
            className="h-[30px] w-[70%] md:w-[20%]"
          />
        </div>
        <div className="flex w-full items-center justify-center p-4">
          {reviews && (
            <Carousel className="h-fit w-full px-4">
              <CarouselContent className="ml-4 flex h-fit w-full justify-center gap-4">
                {reviews.map((review, index) => (
                  <CarouselItem
                    key={index}
                    className="flex h-fit w-full basis-full flex-col items-center justify-center gap-6 rounded-2xl bg-[#f4eee0] md:bg-transparent"
                  >
                    <div
                      className="w-full px-3 py-12 md:max-w-[700px] md:px-12"
                      style={{
                        backgroundImage:
                          "url('/images/home/reviews/reviewbg.png')",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center",
                      }}
                    >
                      <div className="mb-4 flex w-full justify-center">
                        {Array.from({ length: review.rating }).map(
                          (_, index) => (
                            <Icons.star
                              key={index}
                              className="text-[#B6AD7F]"
                            />
                          ),
                        )}
                      </div>
                      <div className="">
                        <p className="font-inter line-clamp-5 text-center text-lg font-[400] text-[#5D5D5D]">
                          {review.text}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full flex-col items-center justify-center gap-2 pb-8">
                      <Image
                        src={
                          review.profile_photo_url ||
                          "/images/home/customer/user.svg"
                        }
                        width={64}
                        height={64}
                        alt={review.author_name}
                      />
                      <div className="flex flex-col items-center justify-center">
                        <p className="font-inter text-lg font-[400] tracking-[1.25px] text-[#595959]">
                          {review.author_name}
                        </p>
                        <span className="font-inter text-sm font-[300] tracking-[0.90px] text-[#292929]">
                          {review.relative_time_description}
                        </span>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden h-14 w-14 bg-[#fffaef] text-black transition-transform duration-300 ease-in-out hover:text-[#A27C47] group-hover:-translate-x-2 md:flex" />
              <CarouselNext className="hidden h-14 w-14 bg-[#fffaef] text-black transition-transform duration-300 ease-in-out hover:text-[#A27C47] group-hover:-translate-x-2 md:flex" />
              <div className="group absolute -bottom-12 left-1/2 flex w-fit -translate-x-1/2 transform items-center gap-2 transition-transform duration-300 ease-in-out md:hidden">
                <CarouselPrevious className="text- border-[#bc995d] transition-transform duration-300 ease-in-out group-hover:-translate-x-2" />
                <CarouselNext className="border-[#bc995d] text-[#bc995d] transition-transform duration-300 ease-in-out group-hover:translate-x-2" />
              </div>
            </Carousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
