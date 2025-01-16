"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React from "react";
import MediaModalWrapper from "../pages/media/MediaModalWrapper";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setIsModal, setResetSelected } from "@/redux/features/meidaSlice";

const MediaModal = () => {
  const { isModal } = useAppSelector((state) => state.media);
  const dispatch = useAppDispatch();

  // Remove modal and selectedImage state will be null
  const handleCloseModal = () => {
    dispatch(setResetSelected());
    dispatch(setIsModal(false));
  };
  return (
    <React.Fragment>
      <Dialog open={isModal} onOpenChange={() => dispatch(setIsModal(false))}>
        <DialogContent className="max-w-[1200px] ">
          <DialogDescription className="min-h-[calc(100vh-100px)]">
            <MediaModalWrapper />;
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default MediaModal;
