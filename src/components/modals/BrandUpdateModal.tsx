import React, { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppSelector } from "@/hooks/useRedux";
import BrandForm from "../forms/BrandForm";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const BrandUpdateModal: FC<Props> = ({ isOpen, setIsOpen }) => {
  const { selectedBrand } = useAppSelector((state) => state.brand);
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent className="w-[350px]">
        <DialogHeader>
          <DialogTitle>Brand update </DialogTitle>
          <DialogDescription>You want to update this data?</DialogDescription>
        </DialogHeader>
        <DialogDescription>
          <BrandForm
            selectedBrand={selectedBrand}
            closeUpdateModal={setIsOpen}
          />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default BrandUpdateModal;
