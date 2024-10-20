import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ViewProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectBanner, setProjectBanner] = useState("");

  const { id } = useParams(); //getting ID

  useEffect(() => {
    const getProject = async () => {
      await axios
        .get(`https://mern-portfolio-backend-vilj.onrender.com/api/v1/project/get/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          // in res total project stored
          setTitle(res.data.project.title);
          setDescription(res.data.project.description);
          setStack(res.data.project.stack);
          setDeployed(res.data.project.deployed);
          setTechnologies(res.data.project.technologies);
          setGitRepoLink(res.data.project.gitRepoLink);
          setProjectLink(res.data.project.projectLink);
          setProjectBanner(
            res.data.project.projectBanner && res.data.project.projectBanner.url
          );
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
    getProject();
  }, [id]);

  const descriptionInListFormat = description.split(". ");
  const technologiesInListFormat = technologies.split(", ");

  return (
    <>
      <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4">
        <div className="w-[100%] px-5 md:w-[1000px] pb-5">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12"></div>
            <div className="flex justify-end">
                <Link to={"/"}><Button>Return to Dashboard</Button></Link>
              </div>
              <div className="mt-10 flex flex-col gap-5">
              <div className="w-full sm:col-span-4">
              <h1 className="text-2xl font-bold mb-4">{title}</h1>
                  <img src={projectBanner ? projectBanner : "/avatarHolder.jpg"} alt="projectBanner" className="w-full h-auto"/>
              </div>
              <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2">Description:</p>
                  <ul className="list-disc">
                    {descriptionInListFormat.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2">Technologies:</p>
                  <ul className="list-disc">
                    {technologiesInListFormat.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2">Stack:</p>
                  <p>{stack}</p>
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2">Deployed:</p>
                  <p>{deployed}</p>
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2">Github Repository Link:</p>
                  <Link className="text-sky-700" target="_blank" to={gitRepoLink}>
                    {gitRepoLink}
                  </Link>
                </div> 
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2">Project Link:</p>
                  <Link className="text-sky-700" target="_blank" to={projectLink ? projectLink : "/"}>
                    {projectLink ? projectLink : "Still Not Deployed"}
                  </Link>
                </div>   
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProject;
