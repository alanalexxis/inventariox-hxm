import React, { useState, useEffect } from "react";
import Card from "components/card";
// import axios
import axios from "axios";

// import icons
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";

import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";

import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";

// api key
const APIkey = "bcf2048bc3be154bded8f277f580ba2e";

const Clima = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Playa del carmen");
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    // if input value is not empty
    if (inputValue !== "") {
      // set location
      setLocation(inputValue);
    }

    // select input
    const input = document.querySelector("input");

    // if input value is empty
    if (input.value === "") {
      // set animate to true
      setAnimate(true);
      // after 500 ms set animate to false
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }

    // clear input
    input.value = "";

    // prevent defaults
    e.preventDefault();
  };

  // fetch the data
  useEffect(() => {
    // set loading to true
    setLoading(true);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}&lang=es`;

    axios
      .get(url)
      .then((res) => {
        // set the data after 1500 ms
        setTimeout(() => {
          setData(res.data);
          // set loading to false
          setLoading(false);
        }, 1500);
      })
      .catch((err) => {
        setLoading(false);
        setErrorMsg(err);
      });
  }, [location]);

  // error message
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("");
    }, 2000);
    // clear timer
    return () => clearTimeout(timer);
  }, [errorMsg]);

  // if data is false show the loader
  if (!data) {
    return (
      <div className="bg-gradientBg flex h-screen w-full flex-col items-center justify-center bg-cover bg-center bg-no-repeat">
        <div>
          <ImSpinner8 className="animate-spin text-5xl text-white" />
        </div>
      </div>
    );
  }

  // set the icon according to the weather
  let icon;

  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy className="text-[#cef3ff]" />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Rain":
      icon = <IoMdRainy className="text-[#31cafb]" />;
      break;
    case "Clear":
      icon = <IoMdSunny className="text-[#ffde33]" />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill className="text-[#31cafb]" />;
      break;
    case "Snow":
      icon = <IoMdSnow className="text-[#31cafb]" />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;
  }

  // date object
  const date = new Date();

  return (
    <Card
      extra={
        "w-full h-full sm:overflow-auto px-6 bg-gradientBg  w-full flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-4 lg:px-0"
      }
      style={{ maxHeight: "500px", overflow: "hidden" }}
    >
      {errorMsg && (
        <div className="absolute top-12 w-full max-w-[90vw] rounded-md bg-[#ff208c] p-4 capitalize text-white lg:top-14 lg:max-w-[450px]">{`${errorMsg.response.data.message}`}</div>
      )}
      {/* form */}
      <form
        className={`${
          animate ? "animate-shake" : "animate-none"
        } bg-black/30 mb-8 h-16 w-full
      max-w-[450px] rounded-full `}
      >
        <div className="relative mt-12 flex h-full items-center justify-between p-2">
          <input
            onChange={(e) => handleInput(e)}
            type="text"
            className=" block w-full rounded-lg border border-none bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-none dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500"
            placeholder="Buscar por ciudad o país"
            required
          ></input>
          <button
            onClick={(e) => handleSubmit(e)}
            className="flex h-12 w-20 items-center justify-center rounded-full bg-[#1aed75] transition hover:bg-[#15dd72d3]"
          >
            <IoMdSearch className="text-2xl text-white" />
          </button>
        </div>
      </form>
      {/* card */}
      <div className="bg-black/20 min-h-[500px] w-full max-w-[450px] rounded-[32px] px-6 text-white ">
        {loading ? (
          <div className="flex h-full w-full items-center justify-center">
            <ImSpinner8 className="animate-spin text-5xl text-white" />
          </div>
        ) : (
          <div>
            {/* card top */}
            <div className="flex items-center gap-x-5 p-2 text-navy-700 dark:text-white">
              {/* icon */}
              <div className="text-[87px]">{icon}</div>
              <div>
                {/* country name */}
                <div className="text-2xl font-semibold">
                  {data.name}, {data.sys.country}
                </div>
                {/* date */}
                <div>
                  {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                  {date.getUTCFullYear()}
                </div>
              </div>
            </div>
            {/* card body */}
            <div className="my-10">
              <div className="flex items-center justify-center text-navy-700 dark:text-white">
                {/* temp */}
                <div className="text-[144px] font-light leading-none">
                  {parseInt(data.main.temp)}
                </div>
                {/* celsius icon */}
                <div className="text-4xl">
                  <TbTemperatureCelsius />
                </div>
              </div>
              {/* weather description */}
              <div className="text-center capitalize text-navy-700 dark:text-white">
                {data.weather[0].description}
              </div>
            </div>
            {/* card bottom */}
            <div className="mx-auto flex max-w-[378px] flex-col gap-y-6 text-navy-700 dark:text-white">
              <div className="flex justify-between ">
                <div className="flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsEye />
                  </div>
                  <div>
                    Visibilidad{" "}
                    <span className="ml-2">{data.visibility / 1000} km</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsThermometer />
                  </div>
                  <div className="flex">
                    Sensación térmica
                    <div className="ml-2 flex">
                      {parseInt(data.main.feels_like)}
                      <TbTemperatureCelsius />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsWater />
                  </div>
                  <div>
                    Humedad
                    <span className="ml-2">{data.main.humidity} %</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsWind />
                  </div>
                  <div>
                    Viento <span className="ml-2">{data.wind.speed} m/s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default Clima;
//al fin funcionaaaa
