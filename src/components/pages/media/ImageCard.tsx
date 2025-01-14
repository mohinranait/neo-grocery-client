import Image from "next/image";
import React, { Dispatch, FC, SetStateAction } from "react";

type Props = {
  onCallBack: () => void;
};
const ImageCard: FC<Props> = ({ onCallBack }) => {
  return (
    <div
      onClick={onCallBack}
      className="border cursor-pointer bg-red-200 border-slate-200"
    >
      <Image
        src={"/images/avater.jpg"}
        width={100}
        height={100}
        alt="image"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ImageCard;
