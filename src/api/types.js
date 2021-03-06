import gql from "graphql-tag"

export default gql`
  scalar Date

  enum Measurement {
    OZ
    ML
    TSP
    TBSP
    DS
    DR
    PN
    BSP
    SPL
    RINSE
    TWIST
    SPG
    SLI
    WDG
    CUBE
  }

  type MeasureList {
    abbreviation: String
    plural: String
    singular: String
  }

  type IngredientFamily {
    id: String
    name: String
    slug: String
    description: String
    parent: IngredientFamily
  }

  input IngredientFamilyInput {
    name: String!
    slug: String
    description: String
    parent: String
  }

  type Ingredient {
    id: String
    name: String
    slug: String
    family: [IngredientFamily]
    description: String
    spec: Spec
  }

  input IngredientInput {
    name: String!
    slug: String
    family: [String]
    description: String
    spec: String
  }

  type Review {
    id: String
    rating: Float
    User: BriefUser
    content: String
    createdAt: Date
  }

  input ReviewInput {
    rating: Float!
    content: String!
  }

  type SpecIngredient {
    quantity: Float
    measure: Measurement
    ingredient: Ingredient
    canSub: Boolean
    subWith: String
  }

  type Spec {
    id: String
    slug: String
    author: String
    name: String
    source: String
    contributedBy: User
    description: String
    ingredients: [SpecIngredient]
    directions: String
    riffOn: Spec
    reviews: [Review]
  }

  input SpecIngredientInput {
    quantity: Float
    measure: Measurement
    name: String!
    slug: String
    canSub: Boolean
    subWith: String
  }

  input SpecInput {
    name: String!
    description: String
    author: String
    source: String
    ingredients: [SpecIngredientInput]
    directions: String!
    riffOn: String
  }

  type BriefUser {
    id: String
    username: String
    email: String
  }

  type User {
    id: String
    username: String
    email: String
    token: String
    book: [Spec]
    shelf: [Ingredient]
  }

  input UserInput {
    username: String!
    password: String!
    email: String!
  }

  type UserToken {
    token: String
  }

  input StringFilterInput {
    lt: String
    gt: String
    eq: String
    ne: String
    contains: String
    like: String
    notLike: String
  }

  input IngredientFilterInput {
    name: StringFilterInput
    family: StringFilterInput
  }

  input SpecFilterInput {
    name: StringFilterInput
    riffOn: StringFilterInput
    ingredients: IngredientFilterInput
  }

  type Mutation {
    editIngredient(ingredient: IngredientInput): Ingredient
    registerIngredientType(family: IngredientFamilyInput): IngredientFamily
    deleteIngredientType(id: String): IngredientFamily
    addIngredient(ingredient: IngredientInput): Ingredient
    deleteIngredient(id: String!): Ingredient
    createSpec(spec: SpecInput): Spec
    editSpec(id: String!, spec: SpecInput): Spec
    deleteSpec(id: String!): Spec
    addIngredientToShelf(id: String!): User
    removeIngredientFromShelf(id: String!): User
    addSpecToBook(id: String!): User
    removeSpecFromBook(id: String!): User
    signUp(username: String!, password: String!, email: String!): User
    login(username: String!, password: String!): UserToken
    deleteUser(id: String!): User
    addReview(spec: String!, review: ReviewInput!): Review
    editReview(id: String!, review: ReviewInput!): Review
    deleteReview(id: String!): Review
  }

  type Query {
    ingredient(id: String, name: String, slug: String): Ingredient
    ingredients: [Ingredient]
    ingredientFamilies: [IngredientFamily]
    specs(filter: SpecFilterInput, limit: Int): [Spec]
    spec(id: String, name: String, slug: String): Spec
    users: [User]
    me: User
    whatICanMake: [Spec]
  }
`
