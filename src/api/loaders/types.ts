import DataLoader from "dataloader"

export type Loaders = {
  [key: string]: DataLoader<unknown, unknown>
}

export type IdType = string | number
