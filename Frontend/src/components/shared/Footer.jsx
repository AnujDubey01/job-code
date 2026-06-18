import React from "react";
// A generic substitute approach
import { Briefcase, CodeXml, Globe, Globe2 } from "lucide-react";


const Footer = () => {
  return (
    <footer className="border-t bg-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div>
            <h1 className="text-2xl font-bold">
              Job <span className="text-[#6A38C2]">Code</span>
            </h1>
            <p className="text-gray-500 mt-4 text-sm">
              Helping developers and professionals find their dream jobs
              faster and smarter.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="hover:text-[#6A38C2] cursor-pointer">Home</li>
              <li className="hover:text-[#6A38C2] cursor-pointer">Jobs</li>
              <li className="hover:text-[#6A38C2] cursor-pointer">Browse</li>
              <li className="hover:text-[#6A38C2] cursor-pointer">Companies</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="hover:text-[#6A38C2] cursor-pointer">
                Career Tips
              </li>
              <li className="hover:text-[#6A38C2] cursor-pointer">
                Resume Builder
              </li>
              <li className="hover:text-[#6A38C2] cursor-pointer">
                Interview Prep
              </li>
              <li className="hover:text-[#6A38C2] cursor-pointer">
                Help Center
              </li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <p className="text-gray-600 text-sm">
              support@jobcode.com
            </p>

            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:text-[#6A38C2]">
                <Briefcase size={20} />
              </a>
              <a href="#" className="hover:text-[#6A38C2]">
                <Globe2 size={20} />
              </a>
              <a href="#" className="hover:text-[#6A38C2]">
                <CodeXml size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Job Code. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;