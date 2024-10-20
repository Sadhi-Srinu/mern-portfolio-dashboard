import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { clearAllUserErrors, getUser, resetProfile, updateProfile } from "@/store/slices/userSlice";
import { toast } from "react-toastify";

const UpdateProfile = () => {
    const {user, loading, error, isUpdated, message} = useSelector((state) => state.user); //getting user details from userSlice.js
    const [fullName, setFullName] = useState(user && user.fullName); 
    const [email, setEmail] = useState(user && user.email); 
    const [phone, setPhone] = useState(user && user.phone); 
    const [aboutMe, setAboutMe] = useState(user && user.aboutMe); 
    const [portfolioURL, setPortfolioURL] = useState(user && user.portfolioURL); 
    const [linkedInURL, setLinkedInURL] = useState(user && (user.linkedInURL === "undefined" ? "" : user.linkedInURL)); 
    const [githubURL, setGithubURL] = useState(user && (user.githubURL === "undefined" ? "" : user.githubURL)); 
    const [instagramURL, setInstagramURL] = useState(user && (user.instagramURL === "undefined" ? "" : user.instagramURL)); 
    const [twitterURL, setTwitterURL] = useState(user && (user.twitterURL === "undefined" ? "" : user.twitterURL)); 
    const [facebookURL, setFacebookURL] = useState(user && (user.facebookURL === "undefined" ? "" : user.facebookURL)); 
    const [avatar, setAvatar] = useState(user && user.avatar && user.avatar.url); 
    const [avatarPreview, setAvatarPreview] = useState(user && user.avatar && user.avatar.url); 
    const [resume, setResume] = useState(user && user.resume && user.resume.url); 
    const [resumePreview, setResumePreview] = useState(user && user.resume && user.resume.url); 

    const dispatch = useDispatch();

    const avatarHandler = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader(); //pre-defined
        reader.readAsDataURL(file);
        reader.onload = ()=>{
            setAvatarPreview(reader.result)
            setAvatar(file);
        }
    }
    const resumeHandler = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader(); //pre-defined
        reader.readAsDataURL(file);
        reader.onload = ()=>{
            setResumePreview(reader.result)
            setResume(file);
        }
    }
    const handleUpateProfile = () =>{
        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("portfolioURL", portfolioURL);
        formData.append("aboutMe", aboutMe);
        formData.append("linkedInURL", linkedInURL);
        formData.append("githubURL", githubURL);
        formData.append("instagramURL", instagramURL);
        formData.append("twitterURL", twitterURL);
        formData.append("facebookURL", facebookURL);
        formData.append("avatar", avatar);
        formData.append("resume", resume);
        dispatch(updateProfile(formData)) // updateProfile coming from store/slice/userSlice updateProfile()
    };

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
    }, [loading, dispatch, error, isUpdated])

  return <>
    <div className="w-full h-full">
        <div>
            <div className="grid w-[100%] gap-6">
                <div className="grid gap-2">
                    <h1 className="text-3xl font-bold">Update Profile</h1>
                    <p className="mb-3">Update Your Profile</p>
                </div>
            </div>
            <div className="grid gap-6">
                <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5">
                    <div className="grid gap-2 w-full sm:w-72">
                        <Label>Profile Image</Label>
                        <Link to={user && user.avatar && user.avatar.url} target="_blank">
                        <img src={avatarPreview ? `${avatarPreview}` : './vite.svg'} alt="avatar" className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"/>
                        </Link>
                        <div className="relative">
                            <input type="file" className="avatar-update-btn" onChange={avatarHandler}/>
                        </div>    
                    </div>
                    <div className="grid gap-2 w-full sm:w-72">
                        <Label>Resume</Label>
                        <Link to={user && user.resume && user.resume.url} target="_blank">
                        <img src={resumePreview ? resumePreview : "./vite.svg"} alt="resume" className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"/>
                        </Link>
                        <div className="relative">
                            <input type="file" className="avatar-update-btn" onChange={resumeHandler}/>
                        </div>  
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label>Full Name</Label>
                    <Input type="text" defaultValue={fullName} onChange={(e)=> setFullName(e.target.value)} placeholder="Your Full Name" />
                </div>
                <div className="grid gap-2">
                    <Label>Email</Label>
                    <Input type="email" defaultValue={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Your Email"/>
                </div>
                <div className="grid gap-2">
                    <Label>Phone</Label>
                    <Input type="text" defaultValue={phone} onChange={(e)=> setPhone(e.target.value)} placeholder="Your Phone Number"/>
                </div>
                <div className="grid gap-2">
                    <Label>About Me</Label>
                    <Textarea defaultValue={aboutMe} onChange={(e)=> setAboutMe(e.target.value)} placeholder="About Me"/>
                </div>
                <div className="grid gap-2">
                    <Label>Portfolio URL</Label>
                    <Input type="text" defaultValue={portfolioURL} onChange={(e)=> setPortfolioURL(e.target.value)} placeholder="Your Portfolio URL"/>
                </div>
                <div className="grid gap-2">
                    <Label>Github URL</Label>
                    <Input type="text" defaultValue={githubURL} onChange={(e)=> setGithubURL(e.target.value)} placeholder="Your Githun URL"/>
                </div>
                <div className="grid gap-2">
                    <Label>LinkedIn URL</Label>
                    <Input type="text" defaultValue={linkedInURL} onChange={(e)=> setLinkedInURL(e.target.value)} placeholder="Your Linked URL"/>
                </div>
                <div className="grid gap-2">
                    <Label>Instagram URL</Label>
                    <Input type="text" defaultValue={instagramURL} onChange={(e)=> setInstagramURL(e.target.value)} placeholder="Your Instagram URL"/>
                </div>
                <div className="grid gap-2">
                    <Label>Twitter(X) URL</Label>
                    <Input type="text" defaultValue={twitterURL} onChange={(e)=> setTwitterURL(e.target.value)} placeholder="Your Twitter URL"/>
                </div>
                <div className="grid gap-2">
                    <Label>Facebook URL</Label>
                    <Input type="text" defaultValue={facebookURL} onChange={(e)=> setFacebookURL(e.target.value)} placeholder="Your Facebook URL"/>
                </div>
                <div className="grid gap-2">
                    {
                        !loading ? <Button onClick={handleUpateProfile} className="w-full" >Update Profile</Button> : <SpecialLoadingButton content={"Updating"}/>
                    }
                </div>
            </div>
        </div>
    </div>
  </>;
};

export default UpdateProfile;
