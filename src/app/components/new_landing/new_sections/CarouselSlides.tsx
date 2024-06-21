import React, { useState } from "react";
import SlideComponent from "./SlideComponent";

interface CarouselSlidesProps {
  slideTitles: string[];
}

const CarouselSlides: React.FC<CarouselSlidesProps> = ({ slideTitles }) => {
  const [current, setCurrent] = useState<number>(0);

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  return (
    <div className="relative overflow-hidden">
      <div
        className={`duration-400 flex transition ease-out`}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slideTitles.map((slide, index) => (
          <SlideComponent key={index} title={slide} />
        ))}
      </div>

      <div className="relative top-0 flex h-full min-w-full items-center justify-center gap-3 text-english_walnut xxs:mt-2 xxs:flex-wrap xxs:gap-y-4 sm:flex-nowrap sm:gap-3 sm:px-10 xxl:mt-4 xxl:text-4xl ">
        {slideTitles.map((title, index) => (
          <button
            className={`w-full rounded-[20px] px-5 pb-3 pt-4 font-zoonaji transition-colors duration-200 hover:bg-reddish_grey xxs:w-[47%] sm:w-auto sm:pb-2 sm:pt-3 lg:rounded-[20px] lg:px-8 lg:pb-3 lg:pt-4 lg:text-xl xlg:rounded-[30px] xlg:px-10 xlg:pb-5 xlg:pt-6
               xlg:text-3xl xxl:rounded-[30px] xxl:px-10 xxl:pb-5 xxl:pt-6 xxl:text-3xl ${index === current ? "bg-reddish_grey" : "bg-cotton_seed"}`}
            key={index}
            onClick={() => goToSlide(index)}
          >
            {title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CarouselSlides;
