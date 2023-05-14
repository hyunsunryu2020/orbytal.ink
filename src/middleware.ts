import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/u(.*)",
    "/api/clerk_hook"
  ]
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/"],
};