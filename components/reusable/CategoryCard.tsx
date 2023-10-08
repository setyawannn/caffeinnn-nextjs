"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

interface CardProps {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const CategoryCard = ({ name, icon, href }: CardProps) => {
  const param = useSearchParams().get("category");

  return (
    <Link
      href={`?category=${href}`}
      className={`flex flex-col items-center w-[6.5rem] rounded-2xl p-3 cursor-pointer duration-300 ${
        param === href ? "bg-yellow-200" : "bg-white shadow-md"
      }`}
    >
      <div
        className={`w-full py-6 rounded-md bg-white flex justify-center ${
          param === href ? "" : "border border-zinc-300"
        }`}
      >
        {icon}
      </div>
      <h5 className="text-base font-medium mt-2">{name}</h5>
    </Link>
  );
};

export default CategoryCard;
