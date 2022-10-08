import { AuthenticatedUser } from "../Users/authorization/authorization"

export interface CreateSpecCommand {
  spec: any
  user: AuthenticatedUser
}

export interface EditSpecCommand {
  id: string
  updates: any
  user: AuthenticatedUser
}

export interface DeleteSpecCommand {
  id: string
  user: AuthenticatedUser
}
