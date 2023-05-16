import { HandlerEvent, HandlerContext } from "@netlify/functions";
import clerk from '@clerk/clerk-sdk-node';
import { getPageBlocksForUsername } from "./utils/lib";


const handler = async (event: HandlerEvent, context: HandlerContext) => {
  let token;
  if(event.headers["cookie"]) {
    const spl = event.headers["cookie"].split("; ")
    console.log(spl)
    spl.forEach(el => {
      if(el.startsWith("__session=")) {
        const spl2 = el.split("__session=")
        if(spl2.length === 2) {
          token = spl2[1]
        }
      }
    })
  }

  if(!token) {
    return {
      statusCode: 401
    }
  }

  const claims = await clerk.verifyToken(token)
  if(claims == null || claims.sub == null) {
    return {
      statusCode: 401
    }
  }

  const user = await clerk.users.getUser(claims.sub)
  if(user == null || user.username == null) {
    return {
      statusCode: 401
    }
  }

  const page_blocks = await getPageBlocksForUsername(user.username)

  const res = {
    user: {
      username: user.username,
      name: user.firstName + " " + user.lastName
    },
    page_blocks
  }

  // your server-side functionality
  return {
    statusCode: 200,
    body: JSON.stringify(res)
  }
};

export { handler };