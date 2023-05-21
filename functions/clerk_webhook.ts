import { HandlerEvent, HandlerContext } from "@netlify/functions";


const handler = async (event: HandlerEvent, context: HandlerContext) => {
  console.log(event.body)

  // your server-side functionality
  return {
    statusCode: 200
  }
};

export { handler };