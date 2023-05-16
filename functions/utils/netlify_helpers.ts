export function createResponse(code: number, body: any) {
  const res: any = {
    statusCode: code
  }
  if(body) {
    res.headers = {
      "Content-Type": "application/json"
    }
    res.body = JSON.stringify(body)
  }
  return res
}