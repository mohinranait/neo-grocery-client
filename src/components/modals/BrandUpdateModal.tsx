"use client";
import React, { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BrandForm from "../forms/BrandForm";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const BrandUpdateModal: FC<Props> = ({ isOpen, setIsOpen }) => {
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent className="w-[350px]">
        <DialogHeader>
          <DialogTitle>Brand update </DialogTitle>
          <DialogDescription>You want to update this data?</DialogDescription>
        </DialogHeader>
        <DialogDescription>
          <BrandForm closeModal={setIsOpen} />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default BrandUpdateModal;
