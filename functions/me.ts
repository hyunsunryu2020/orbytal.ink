import { HandlerEvent, HandlerContext } from "@netlify/functions";
import clerk from '@clerk/clerk-sdk-node';
import { getPageBlocksForUsername, getUserWithBlocksForUsername, updateProfile } from "./utils/lib";


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

  if(event.httpMethod === "GET") {
    const userAndBlocks = await getUserWithBlocksForUsername(user.username)
  
    const res = {
      user: {
        username: user.username,
        name: user.firstName + " " + user.lastName,
        tagline: userAndBlocks.tagline
      },
      blocks: userAndBlocks.blocks
    }
  
    return {
      statusCode: 200,
      body: JSON.stringify(res)
    }
  }

  if(event.httpMethod === "POST") {
    if(!event.body) {
      return {
        statusCode: 400
      }
    }
    
    const body = JSON.parse(event.body)
    await updateProfile(user.username, body.tagline)

    return {
      statusCode: 200
    }
  }
};

export { handler };