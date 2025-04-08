import type { NextConfig } from "next";
import { redirect } from "next/dist/server/api-utils";


const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  async headers(){
   return [
    {
      source: "/about",
      headers:[{
        key:"Name",
        value:"Manikandan"
      }
    ]
    }
   ]
  },
  async redirects(){
    return[
      {
        source:"/mani",
        destination:"/about",
        permanent:true
      }
    ]
  },
  async rewrites(){
    return[
      {
        source:"/mani/dbfhbdj",
        destination:"/about"
      }
    ]
  }
}

export default nextConfig;
