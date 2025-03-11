"use-client";
import React from "react";
import loader from "../../../public/assets/icons/loading.svg";
import Image from "next/image";
const Button = ({
  text,
  img,
  className,
  onClick,
  minHeight,
  maxHeight,
  minWidth,
  height,
  width,
  disabled,
  imgClass,
  loading = false,
  maxWidth,
  padding,
}) => {
  const buttonStyle = {
    minHeight: minHeight,
    maxHeight: maxHeight,
    minWidth: minWidth,
    maxWidth: maxWidth,
    height: height,
    width: width,
    padding: padding,
    disabled: loading,
  };
  if (loading) {
    disabled = true;
  }
  console.log(loading);
  return (
    <button
      className={`min-w-24 cursor-pointer text-base font-medium rounded-md transition capitalize duration-150 ease-in-out p-2.5 bg-green-500 ${
        loading && "!cursor-not-allowed"
      } ${className}`}
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? (
        <>
          <span className="flex justify-center  items-center gap-2">
            {text}

            <Image
              src={loader}
              alt="loading"
              className={`size-5 animate-spin ${imgClass}`}
            />
          </span>
        </>
      ) : (
        <>
          <span>{text}</span>
          {img && (
            <Image src={img} alt="img" className={`size-5 ${imgClass}`} />
          )}
        </>
      )}
    </button>
  );
};
export default Button;
