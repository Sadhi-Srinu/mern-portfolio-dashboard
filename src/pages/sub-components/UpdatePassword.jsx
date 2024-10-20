import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { clearAllUserErrors, getUser, resetProfile, updatePassword } from "@/store/slices/userSlice";
import { toast } from "react-toastify";

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("") // currentPassword is comming from userSlice.js
  const [newPassword, setNewPassword] = useState("") // newPassword is comming from userSlice.js
  const [confirmNewPassword, setConfirmNewPassword] = useState("") // confirmNewPassword is comming from userSlice.js

  const { loading, error, isUpdated, message} = useSelector((state) => state.user); //getting user details from userSlice.js

  const dispatch = useDispatch();

  const handleUpatePassword = ()=>{
    dispatch(updatePassword(currentPassword, newPassword, confirmNewPassword)) // This data (currentPassword, newPassword, confirmNewPassword) sending from userSlice

  }

  useEffect(()=>{
    if(error){
        toast.error(error);
        dispatch(clearAllUserErrors())
    }
    if(isUpdated){
        dispatch(getUser())
        dispatch(resetProfile())
    }
    if(message){
        toast.success(message)
    }
}, [loading, dispatch, error, isUpdated]);

  return <>
   <div className="w-full h-full">
        <div>
            <div className="grid w-[100%] gap-6">
                <div className="grid gap-2">
                    <h1 className="text-3xl font-bold">Update Password</h1>
                    <p className="mb-3">Update Your Dashboard Passwor</p>
                </div>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label>Current Password</Label>
                    <Input type="text" value={currentPassword} onChange={(e)=> setCurrentPassword(e.target.value)} placeholder="Current Password" />
                </div>
                <div className="grid gap-2">
                    <Label>New Password</Label>
                    <Input type="text" value={newPassword} onChange={(e)=> setNewPassword(e.target.value)} placeholder="New Password" />
                </div>
                <div className="grid gap-2">
                    <Label>Confirm New Password</Label>
                    <Input type="text" value={confirmNewPassword} onChange={(e)=> setConfirmNewPassword(e.target.value)} placeholder="Confirm New Password" />
                </div>
                <div className="grid gap-2">
                    {
                        !loading ? <Button onClick={handleUpatePassword} className="w-full" >Update Password</Button> : <SpecialLoadingButton content={"Updating"}/>
                    }
                </div>
            </div>
        </div>
    </div>
  </>;
};

export default UpdatePassword;
