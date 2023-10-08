import Image from "next/image";
import React from "react";

interface CardProps {
  name: string;
  price: number;
  image: string;
}

const MenuCard = ({ name, price, image }: CardProps) => {
  const changeK = (value: number) => {
    const result = value / 1000;
    return result;
  };

  return (
    <div
      onClick={() => {}}
      className="flex flex-col justify-center items-center p-4 rounded-xl hover:bg-zinc-100 cursor-pointer duration-200"
    >
      <div className="w-full flex justify-center rounded-full">
        <Image
          src={
            image ||
            "https://ik.imagekit.io/setyawanlearn/ukk-cafe/menu/Coffee_Latte_1696742449432_VKCpwW991"
          }
          alt=""
          width={200}
          height={200}
          className="w-full h-fit"
        />
      </div>
      <div className="text-center mt-2">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-2xl font-medium text-danger">{changeK(price)}K</p>
      </div>
    </div>
  );
};

export default MenuCard;
