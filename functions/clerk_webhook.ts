import { HandlerEvent, HandlerContext } from "@netlify/functions";
import clerk from '@clerk/clerk-sdk-node';
import { getPageBlocksForUsername } from "./utils/lib";


const handler = async (event: HandlerEvent, context: HandlerContext) => {
  console.log(JSON.stringify(event))

  // your server-side functionality
  return {
    statusCode: 200
  }
};

export { handler };