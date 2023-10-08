import React from "react";

interface TitleProps {
  bold: string;
  normal: string;
}

const Title = ({ bold, normal }: TitleProps) => {
  return (
    <h1 className="text-3xl font-normal text-zinc-800">
      <span className="font-semibold">{bold}</span> {normal}
    </h1>
  );
};

export default Title;
