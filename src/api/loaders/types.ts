import DataLoader from "dataloader"
import { Model } from "sequelize-typescript"

export type Loaders = {
  [key: string]: DataLoader<unknown, unknown>
}

export type IdType = string | number

export type IdList = readonly IdType[]

export type LookupTable = {
  [key: IdType]: any
}
