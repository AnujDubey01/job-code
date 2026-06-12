import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { User2, LogOut } from "lucide-react";
import { Link } from 'react-router-dom'


function Navbar() {
  const user = false;
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job <span className="text-red-700">Code</span>
          </h1>
        </div>

        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
          </ul>
          {!user ? (
            <div className="flex items-center gap-2.5">
              <Link to="/Login"><Button variant="outline">LogIn</Button></Link>
              <Link to="/Signup"><Button   className="bg-[#8e54f1] hover:bg-[#6A38C2]  font-medium text-white">SignUp</Button></Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader className="w-80">
                  <div className="flex gap-4">
                    <Avatar className="cursor-pointer">
                      <AvatarImage src="https://github.com/shadcn.png" />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">Hii Anuj !</h4>
                      <p className="text-sm text-muted-foreground">
                        Lorem ipsum, ds impedit? Et velit laudantium?
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col my-2 text-gray-500">
                    <div className="flex w-fit items-center gap-2 cursor-pointer ">
                      <User2 />
                      <Button variant="link">View Profile</Button>
                    </div>
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button variant="link">Logout</Button>
                    </div>
                  </div>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
