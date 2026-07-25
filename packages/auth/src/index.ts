//barrel export 

export { auth } from "./auth.js"

//re-export the inferred types for use across the monorepo
export type { Session, User } from "better-auth";