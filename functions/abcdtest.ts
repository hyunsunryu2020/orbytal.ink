import { createResponse } from "./utils/netlify_helpers";
import { testRelations } from "./utils/lib";


const handler = async () => {
  const data = await testRelations()
  return createResponse(200, data)
};

export { handler };