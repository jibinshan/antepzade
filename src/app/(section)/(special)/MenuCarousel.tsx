"use client";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "@/app/(section)/(special)/MenuArrowButtons";
import { useDotButton } from "@/app/(section)/(special)/MenuDotButton";
import "@/app/(section)/(special)/embla-menu.css";
import ModelBox from "@/components/ModelBox";
import type {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import React, { useCallback, useEffect, useRef } from "react";

const TWEEN_FACTOR_BASE = 0.52;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

type PropType = {
  slides: { modelUrl: string; price: string; name: string }[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const { selectedIndex, scrollSnaps } = useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(
        ".embla-menu__slide__number",
      ) as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenScale = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap?.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
          const scale = numberWithinRange(tweenValue, 0, 1).toString();
          const tweenNode = tweenNodes.current[slideIndex];
          if (!tweenNode) return;
          tweenNode.style.transform = `scale(${scale})`;
          tweenNode.style.opacity = scale;
        });
      });
    },
    [],
  );

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenScale(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenScale)
      .on("scroll", tweenScale)
      .on("slideFocus", tweenScale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emblaApi, tweenScale]);

  return (
    <>
      <div className="z-50 flex w-full flex-col items-center gap-4">
        <div className="embla-menu">
          <div className="embla-menu__viewport" ref={emblaRef}>
            <div className="embla-menu__container">
              {slides.map((item, index) => (
                <div className="embla-menu__slide" key={index}>
                  <div className="embla-menu__slide__number h-full w-full">
                    <ModelBox
                      src={item.modelUrl}
                      width="400px"
                      height="400px"
                      cameraOrbit="0deg 40deg 0deg 5m"
                      fieldOfView="25deg"
                      cameraTarget="0m 0m 0m"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex w-full items-center justify-center pb-6">
              <p className="min-h-[50px] max-w-[300px] text-center font-forum text-4xl">
                {slides[selectedIndex]?.name}
              </p>
            </div>
          </div>
        </div>
        <div className="relative flex h-auto w-full items-center justify-end gap-2 px-10 md:px-64">
          <div className="absolute left-1/2 flex -translate-x-1/2 transform items-center gap-6">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
          <p className="flex items-center font-playfair text-3xl">
            <span className="text-primary">{selectedIndex + 1}</span>/{" "}
            {scrollSnaps.length}
          </p>
        </div>
      </div>
      {/* <div className="absolute left-0 top-0 z-10 flex h-full w-full justify-center">
        <div
          className="h-full w-[90%] sm:w-[70%] lg:w-[50%] xl:w-[30%]"
          style={{
            borderRadius: "187.5rem 187.5rem 0rem 0rem",
            background: "linear-gradient(180deg, #161616 0%, #070707 100%)",
          }}
        />
        <div className="absolute left-1/2 top-0 translate-x-16 transform sm:translate-x-24 md:translate-x-28">
          <div className="relative flex size-24 items-center justify-center">
            <Icons.badge className="absolute z-10 h-full w-full text-primary" />
            <p className="relative z-20 flex items-center gap-2 font-playfair text-3xl text-[#282828]">
              $
              <span className="flex h-fit w-fit items-center">
                {slides[selectedIndex]?.price}
              </span>
            </p>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default EmblaCarousel;
