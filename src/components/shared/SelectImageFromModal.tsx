"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setResetSelected } from "@/redux/features/mediaSlice";
import { TMediaType } from "@/types/media.type";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
  singleFile?: React.Dispatch<React.SetStateAction<TMediaType | null>>;
  multiFiles?: React.Dispatch<React.SetStateAction<TMediaType[]>>;
};
const SelectImageFromModal = ({ children, singleFile, multiFiles }: Props) => {
  const { selectedFile, uploadVariant, selectedFiles } = useAppSelector(
    (state) => state.media
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (uploadVariant === "Single" && singleFile && selectedFile) {
      singleFile(selectedFile);
      dispatch(setResetSelected());
    } else if (
      uploadVariant !== "Single" &&
      multiFiles &&
      selectedFiles.length > 0
    ) {
      multiFiles(selectedFiles);
      dispatch(setResetSelected());
    }
  }, [
    selectedFile,
    selectedFiles,
    singleFile,
    multiFiles,
    uploadVariant,
    dispatch,
  ]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default SelectImageFromModal;
