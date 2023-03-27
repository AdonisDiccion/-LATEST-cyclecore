import { Box, Button, Grid } from "@mui/material";
import Card from "./Card";
import { React, useState } from "react";
import { Datas } from "../../Data/data"; 

const Parts = () => {
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const [selectedImg, setSelectedImg] = useState('')

  const handleCardSelect = (imgUrl) => {
    setSelectedImg(imgUrl);
  }

  const handleButtonClick = (index) => {
    setActiveButtonIndex(index);
  };

  return (

    <div className="flex flex-col items-center mt-14">
      <Box>
        <h1 className="font-varela font-bold text-3xl tracking-[10px] drop-shadow">
          CUSTOMIZATION
        </h1>
        <div className="h-0.5 rounded-full bg-sky-300 w-[15rem] items-center mx-auto"></div>
      </Box>

      <Box display="flex" gap={4} mt="2rem">
        <Button
          variant={activeButtonIndex === 0 ? "contained" : "text"}
          color="inherit"
          onClick={() => handleButtonClick(0)}
        >
          <span className="text-xl font-varela">Frame Set</span>
        </Button>
        <Button
          variant={activeButtonIndex === 1 ? "contained" : "text"}
          color="inherit"
          onClick={() => handleButtonClick(1)}
        >
          <span className="text-xl font-varela">Bar / Stem</span>
        </Button>
        <Button
          variant={activeButtonIndex === 2 ? "contained" : "text"}
          color="inherit"
          onClick={() => handleButtonClick(2)}
        >
          <span className="text-xl font-varela">Group Set</span>
        </Button>
        <Button
          variant={activeButtonIndex === 3 ? "contained" : "text"}
          color="inherit"
          onClick={() => handleButtonClick(3)}
        >
          <span className="text-xl font-varela">Wheels</span>
        </Button>
        <Button
          variant={activeButtonIndex === 4 ? "contained" : "text"}
          color="inherit"
          onClick={() => handleButtonClick(4)}
        >
          <span className="text-xl font-varela">Tires</span>
        </Button>
        <Button
          variant={activeButtonIndex === 5 ? "contained" : "text"}
          color="inherit"
          onClick={() => handleButtonClick(5)}
        >
          <span className="text-xl font-varela">Saddles</span>
        </Button>
      </Box>

      <Box display='flex' gap={2} mt='2rem'>
        {Datas.frameData.map((data, index) => (
          <Card img={data.img} title={data.title} key={index} onSelect={() => handleCardSelect(data.img)}/>
        ))}
      </Box>

      <Box width="60rem" mt='2rem'>
        <img
          src={selectedImg}
          alt=""
          className="mx-auto"
        />
      </Box>
    </div>
  );
};

export default Parts;
