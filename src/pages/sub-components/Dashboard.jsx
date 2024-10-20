import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { clearAllSoftwareAppErrors, deleteSoftwareApplication, getAllSoftwareApplications, resetSoftwareApplicationSlice } from "@/store/slices/softwareApplicationSlice";
import { toast } from "react-toastify";


const Dashboard = () => {
  const {user} = useSelector(state => state.user)
  const {projects} = useSelector(state => state.project)
  const {skills} = useSelector(state => state.skill)
  const {softwareApplications, error, loading, message} = useSelector(state=>state.softwareApplications) // {softwareApplications} is coming from softwareApplicationSlice.js
  const {timeline} = useSelector(state=>state.timeline) // {timeline} is coming from softwareApplicationSlice.js

  const [appId, setAppId] = useState("")
  const dispatch = useDispatch();

  const handleDeleteSoftwareApp = (id) => {
    setAppId(id);
    dispatch(deleteSoftwareApplication(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSoftwareAppErrors());
    }
     if(message) {
      toast.success(message)
      dispatch(resetSoftwareApplicationSlice());
      dispatch(getAllSoftwareApplications());
     }
   
  }, [dispatch, message, loading, error]);

  return <>
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card className="sm:col-span-2">
                <CardHeader className="pb-3">
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    {user.aboutMe}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link to={user.portfolioURL && user.portfolioURL} target="_blank"><Button>Visit Portfolio</Button></Link>
                </CardFooter>
              </Card>
              <Card className="flex flex-col justify-center">
                <CardHeader className="pb-2">
                  <CardTitle>Projects Completed</CardTitle>
                  <CardTitle className="text-6xl">
                    {projects && projects.length}
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                 <Link to={"/manage/projects"}>
                  <Button >Manage Projects</Button>
                 </Link>
                </CardFooter>
              </Card>
              <Card className="flex flex-col justify-center">
                <CardHeader className="pb-2">
                  <CardTitle>Skills</CardTitle>
                  <CardTitle className="text-6xl">
                    {skills && skills.length}
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                 <Link to={"/manage/skills"}><Button >Manage Skill</Button></Link>
                </CardFooter>
              </Card>

          </div>
          <Tabs>
            <TabsContent>
              <Card>
                <CardHeader className="px-7">
                  <CardTitle>Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead className="hidden md:table-cell">Stack</TableHead>
                          <TableHead className="hidden md:table-cell">Deployed</TableHead>
                          <TableHead className="md:table-cell">Update</TableHead>
                          <TableHead className="text-right">Visit</TableHead>
                      </TableRow>
                    </TableHeader>
                       <TableBody>
                       {projects && projects.length > 0 ? (
                         projects.map((element) => {
                           return (
                             <TableRow className="bg-accent" key={element._id}>
                               <TableCell>
                                 <div className="font-semibold">{element.title}</div>
                               </TableCell>
                               <TableCell className="hidden md:table-cell">
                                 {element.stack}
                               </TableCell>
                               <TableCell className="hidden md:table-cell">
                                   {element.deployed}
                               </TableCell>
                               <TableCell className="md:table-cell">
                                 <Link to={`/update/project/${element._id}`}>
                                   <Button>Update</Button>
                                 </Link>
                               </TableCell>
                               <TableCell className="text-right">
                                 <Link to={element.projectLink ? `${element.projectLink}` : ""} target="_blank">
                                   <Button>Visit</Button>
                                 </Link>
                               </TableCell>
                             </TableRow>
                           );
                         })
                       ) : (
                         <TableRow>
                           <TableCell className="text-3xl overflow-y-hidden">
                             You have not added any project.
                           </TableCell>
                         </TableRow>
                       )}
                     </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <Tabs>
            <TabsContent>
              <Card>
                <CardHeader className="px-7 gap-3">
                  <CardTitle>Skills</CardTitle>
                 </CardHeader>
                 <CardContent className="grid sm:grid-cols-2 gap-4">
                  {
                    skills && skills.length > 0 ? (
                      skills.map(element => {
                        return(
                          <Card key={element._id}>
                            <CardHeader>{element.title}</CardHeader>
                            <CardFooter>
                              <Progress value={element.proficiency} />
                            </CardFooter>
                          </Card>
                        )
                      })
                    ) :   <p className="text-3xl">You have not added any skill.</p>
                  }
                 </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <Tabs>
          <TabsContent className="grid min-[1050px]:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="px-7">
                <CardTitle>Software Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                      <TableHead className="md:table-cell">Icon</TableHead>
                      <TableHead className="md:table-cell text-center">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {
                      softwareApplications && softwareApplications.length > 0 ? (
                        softwareApplications.map(element=>{
                          return(
                            <TableRow className="bg-accent" key={element._id}>
                            <TableCell className="font-medium">{element.name}</TableCell>
                            <TableCell className="md:table-cell">
                              <img className="w-7 h-7" src={element.svg && element.svg.url} alt={element.name}/>
                            </TableCell>
                            <TableCell className="md:table-cell  text-center">
                              {
                                loading && appId === element._id ? <SpecialLoadingButton content={"Deleting..."} width={"w-fit"} /> :  <Button onClick={()=> handleDeleteSoftwareApp(element._id)}>Delete</Button>
                              }
                             
                            </TableCell>
                          </TableRow>
                          )
                        })
                      ) : <TableRow>
                        <TableCell className="text-3xl overflow-y-hidden">
                          You have not added any software
                        </TableCell>
                      </TableRow>
                    }    
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="px-7 flex items-center flex-row justify-between">
                <CardTitle>Timeline</CardTitle>
                <Link to={"/manage/timeline"}><Button>Manage Timeline</Button></Link>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>From</TableHead>
                      <TableHead>To</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {
                      timeline && timeline.length > 0 ? (
                        timeline.map(element=>{
                          return(
                            <TableRow key={element._id} className="bg-accent">
                              <TableCell className="font-medium">{element.title}</TableCell>
                              <TableCell className="font-medium">{element.timeline.from}</TableCell>
                              <TableCell className="font-medium">{element.timeline.to ? `${element.timeline.to}` : "Present"}</TableCell>
                            </TableRow>
                          )
                        })
                      ) : <TableRow>
                      <TableCell className="overflow-hidden text-3xl">
                        You have not added ant timeline
                      </TableCell>
                      </TableRow>
                    }
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  </>;
};

export default Dashboard;
