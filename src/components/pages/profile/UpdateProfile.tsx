"use client";
import { IUser, UpdateUserDto } from "@/services/user/user.interface";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/ui/dialog";
import { IoClose } from "react-icons/io5";
import { BiSolidImage } from "react-icons/bi";
import Image from "next/image";
import { useUploadFile } from "@/hooks/useUploadFile";
import { CloudinaryFile, CloudinaryResponse } from "@/services/file/file.interface";
import { usePreviewFile } from "@/hooks/usePreviewFile";
import { Button } from "@/shadcn/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserService } from "@/services/user/user.service";
import { QUERY_KEY } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { Input } from "@/shadcn/ui/input";
interface Props {
  user: IUser;
}

export const UpdateProfile: FC<Props> = ({ user }) => {
  const [updateData, setUpdateData] = useState<UpdateUserDto>({
    avatarPath: user.avatarPath ?? null,
    bgPath: user.bgPath ?? null,
    displayName: user.displayName,
    userName: user.userName,
  });
  const queryClient = useQueryClient();
  const { replace } = useRouter();
  const { mutate } = useMutation({
    mutationFn: (data: UpdateUserDto) => UserService.updateProfile(data),
    onSuccess(data, variables, context) {
      replace("/" + updateData.userName);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.profile, { userName: updateData.userName }],
      });
    },
  });
  const updateProfile = () => {
    mutate(updateData);
  };
  return (
    <Dialog>
      <DialogTrigger>Settings</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <div className="w-full flex flex-col">
          <UpdateBg setUpdateData={setUpdateData} updateData={updateData} />
        </div>
        <div className="flex flex-col gap-4">
          <Input
            type="text"
            onChange={(e) => setUpdateData((prev) => ({ ...prev, userName: e.target.value }))}
            value={updateData.userName}
            placeholder="userName"
          />
          <Input
            type="text"
            onChange={(e) => setUpdateData((prev) => ({ ...prev, displayName: e.target.value }))}
            value={updateData.displayName}
            placeholder="displayName"
          />
        </div>
        <Button onClick={updateProfile}>Update</Button>
      </DialogContent>
    </Dialog>
  );
};

interface UpdateBgProps {
  updateData: UpdateUserDto;
  setUpdateData: Dispatch<SetStateAction<UpdateUserDto>>;
}
const UpdateBg: FC<UpdateBgProps> = ({ setUpdateData, updateData }) => {
  //   const [currentBg, setCurrentBg] = useState<string | null>(defaultBgPath);
  const { uploadFile, attachments, remove } = usePreviewFile();
  useEffect(() => {
    if (attachments.length > 0) {
      //   setCurrentBg(attachments[0].secure_url);
      setUpdateData((prev) => ({
        ...prev,
        bgPath: {
          public_id: attachments[0].public_id,
          url: attachments[0].secure_url,
        },
      }));
    }

    return () => {};
  }, [attachments]);
  useEffect(() => {
    if (!updateData.bgPath && attachments.length > 0) {
      remove(attachments[0].public_id);
    }

    return () => {};
  }, [updateData]);
  const clearBg = () => setUpdateData((prev) => ({ ...prev, bgPath: null }));

  return (
    <div>
      {updateData.bgPath?.url ? (
        <div className="w-full h-32 relative">
          <button
            onClick={clearBg}
            className="absolute bg-secondary w-6 h-6 rounded-full flex justify-center items-center top-2 right-2 z-20"
          >
            <IoClose />
          </button>
          <Image className="object-cover" fill src={updateData.bgPath.url} alt="" />
        </div>
      ) : (
        <label className="w-full h-32 bg-secondary hover:brightness-75 transition-all cursor-pointer group flex justify-center items-center">
          <input onChange={uploadFile} accept="image/*" className="hidden" type="file" />
          <div className="group-hover:opacity-100 opacity-0">
            <BiSolidImage className="text-3xl" />
          </div>
        </label>
      )}
    </div>
  );
};
