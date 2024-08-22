// https://www.youtube.com/watch?v=q-Y0bnx6Ndw

import Image from "next/image";
import React, { useEffect, useState } from "react";
import classNames from "classnames";

type SkullData = {
  name: string;
  link: string;
};

type SkullPosition = {
  left: string;
  top: string;
  data: SkullData;
};

const skullDataList: SkullData[] = [
  {
    name: "Isabella",
    link: "https://www.linkedin.com/in/isabella-anthony-9b435329b/",
  },
  { name: "Leah", link: "https://www.linkedin.com/in/hernandez-leah/" },
  { name: "Gian", link: "https://www.linkedin.com/in/gian-pena/" },
  { name: "Wissam", link: "https://www.linkedin.com/in/wissam-hassani/" },
  { name: "Luis", link: "https://www.linkedin.com/in/luisahumadam" },
  {
    name: "Ricardo",
    link: "https://www.linkedin.com/in/ricardo-garcia-365a2318a",
  },
  { name: "Mridul", link: "https://www.linkedin.com/in/mridul-pahwa" },
  { name: "Raidel", link: "http://linkedin.com/in/raidel-almeida-62a89929a" },
  { name: "Bora", link: "https://www.linkedin.com/in/bora-dibra/" },
  { name: "Gabriel P", link: "https://www.youtube.com/watch?v=q-Y0bnx6Ndw" },
  { name: "Gabriel L", link: "https://linkedin.com/in/gabriel-lucchesi" },
  {
    name: "Anncarolyne",
    link: "https://www.linkedin.com/in/anncarolyne-power-03400925b",
  },
  {
    name: "Elizabeth",
    link: "https://www.linkedin.com/in/elizabeth-hechavarria-0601702a9/",
  },
  { name: "Juan", link: "https://www.linkedin.com/in/juan-carmona-83707b235/" },
  { name: "Morgan", link: "https://www.linkedin.com/in/VillanuevaM305" },
  {
    name: "Rayhan",
    link: "https://www.linkedin.com/in/rayhan-m-808123211/",
  },
  {
    name: "Jacob",
    link: "https://www.linkedin.com/in/jacob-schuster-396947211/",
  },
  {
    name: "David U",
    link: "https://www.linkedin.com/in/david-ulloa-785396184/",
  },
  {
    name: "Bruna",
    link: "https://www.linkedin.com/in/bruna-gentil-84923515a/",
  },
  { name: "Nathan", link: "https://www.linkedin.com/in/nathan-lioe-a-tjam/" },
  { name: "Nicolas", link: "http://www.linkedin.com/in/nicolasdevoto96" },
  { name: "Cristhofer", link: "https://www.linkedin.com/in/cristhoferlugo/" },
  { name: "Ulysses", link: "https://www.linkedin.com/in/ulysses-e-08244a46/" },
  {
    name: "Zubayer Ahmed",
    link: "https://www.linkedin.com/in/ahmedsadid",
  },
  { name: "Rafael", link: "https://www.linkedin.com/in/rafojeda/" },
  {
    name: "William",
    link: "https://www.linkedin.com/in/william-barranco-188570191",
  },
  { name: "Stephanie", link: "http://linkedin.com/in/spainchault" },
  {
    name: "Dabian",
    link: "https://www.linkedin.com/in/dabian-garnica-6509a7275",
  },
  { name: "David M", link: "https://www.linkedin.com/in/dmor/" },
  { name: "Allan", link: "https://www.linkedin.com/in/allanprieb/" },
  { name: "Megan", link: "https://www.linkedin.com/in/megan-wee-tom/" },
  { name: "Robert", link: "https://www.linkedin.com/in/velasquezrobert/" },
  { name: "Ruth", link: "https://www.linkedin.com/in/ruth-velasquez070" },
  { name: "Jaelene", link: "https://www.linkedin.com/in/jaelene-dela-cruz/" },
];

const skulls = [
  "/assets/new/skulls/skull_1.svg",
  "/assets/new/skulls/skull_2.svg",
  "/assets/new/skulls/skull_3.svg",
  "/assets/new/skulls/skull_4.svg",
];

const generateRandomPosition = (data: SkullData): SkullPosition => {
  const left = Math.floor(Math.random() * 90) + 5;
  const top = Math.floor(Math.random() * 90) + 5;
  return {
    left: `${left}%`,
    top: `${top}%`,
    data,
  };
};

const getRandomSkull = (): string => {
  const index = Math.floor(Math.random() * skulls.length);
  return skulls[index]!;
};

const skullsSizeRandom = (screenSize: string) => {
  const minSize =
    screenSize === "small"
      ? 20
      : screenSize === "medium"
        ? 30
        : screenSize === "large"
          ? 40
          : 50;
  const maxSize =
    screenSize === "small"
      ? 40
      : screenSize === "medium"
        ? 50
        : screenSize === "large"
          ? 60
          : 70;
  return Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
};

const getRandomRotation = () => {
  const minRotation = -5;
  const maxRotation = 5;
  return Math.random() * (maxRotation - minRotation) + minRotation;
};

const isOverlapping = (pos1: SkullPosition, pos2: SkullPosition): boolean => {
  const buffer = 10; // distance buffer to avoid overlap
  const leftDiff = Math.abs(parseInt(pos1.left) - parseInt(pos2.left));
  const topDiff = Math.abs(parseInt(pos1.top) - parseInt(pos2.top));
  return leftDiff < buffer && topDiff < buffer;
};

const generateUniquePositions = (dataList: SkullData[]): SkullPosition[] => {
  const positions: SkullPosition[] = [];
  for (const data of dataList) {
    let newPos: SkullPosition;
    let overlapping;
    do {
      newPos = generateRandomPosition(data);
      overlapping = positions.some((pos) => isOverlapping(pos, newPos));
    } while (overlapping);
    positions.push(newPos);
  }
  return positions;
};

const SkullLavaSection: React.FC = () => {
  const [skullPositions, setSkullPositions] = useState<SkullPosition[]>([]);
  // should be useRef but im tired man, give me a break
  const [styles, setStyles] = useState({ top: "10%", height: "30vh" });

  useEffect(() => {
    const positions = generateUniquePositions(skullDataList);
    setSkullPositions(positions);
  }, []);

  const calculateStyles = () => {
    let top, height;
    if (window.innerWidth >= 1175) {
      top = "20%";
      height = "70vh";
    } else if (window.innerWidth >= 1024) {
      top = "15%";
      height = "70vh";
    } else if (window.innerWidth >= 830) {
      top = "18%";
      height = "55vh";
    } else if (window.innerWidth >= 700) {
      top = "15%";
      height = "43vh";
    } else if (window.innerWidth >= 600) {
      top = "7%";
      height = "35vh";
    } else {
      top = "5%";
      height = "30vh";
    }
    return { top, height };
  };

  const calculateSize = () => {
    if (window.innerWidth <= 600) {
      return 0;
    } else if (window.innerWidth <= 768) {
      return skullsSizeRandom("small");
    } else if (window.innerWidth <= 1024) {
      return skullsSizeRandom("medium");
    } else {
      return skullsSizeRandom("large");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setStyles(calculateStyles());
    };

    setStyles(calculateStyles()); // Set initial values on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const positions = generateUniquePositions(skullDataList);
    setSkullPositions(positions);
  }, []);

  useEffect(() => {
    const positions = generateUniquePositions(skullDataList);
    setSkullPositions(positions);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxHeight: "40%",
        top: calculateStyles().top,
        height: calculateStyles().height,
      }}
    >
      {skullPositions.map((pos, index) => (
        <div
          key={index}
          className="group absolute text-white"
          style={{
            left: pos.left,
            top: pos.top,
            display: window.innerWidth <= 600 ? "none" : "block",
          }}
        >
          <Image
            className={classNames("-z-50", "transition-transform duration-500")}
            src={getRandomSkull()}
            width={calculateSize()}
            height={calculateSize()}
            alt="skull"
            style={{
              transform: `rotate(${getRandomRotation()}deg)`,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <a
              href={pos.data.link}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap rounded bg-black bg-opacity-50 px-2 py-1 font-bold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              {pos.data.name}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkullLavaSection;
