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

  enum PreparationType {
    SHAKEN
    STIRRED
    OTHER
  }

  type MeasureList {
    abbreviation: String
    plural: String
    singular: String
  }

  type BaseError {
    message: String!
  }

  type RecordNotFoundError implements BaseError {
    message: String!
  }

  type NotPermittedError implements BaseError {
    message: String!
  }

  type RecordCouldNotBeUpdatedError implements BaseError {
    message: String!
  }

  type CollectionDuplicateError implements BaseError {
    message: String!
  }

  type Ingredient {
    id: String
    name: String
    slug: String
    proof: Int
    imageURL: String
    description: String
    spec: Spec
    parentId: String
    parent: Ingredient
  }

  type IngredientResult = Ingredient | RecordNotFoundError | RecordCouldNotBeUpdatedError;

  type IngredientDetail {
    id: String
    name: String
    slug: String
    proof: Int
    imageURL: String
    description: String
    spec: Spec
    parentId: String
    parent: Ingredient
    children: [Ingredient]
    cocktails: [Spec]
  }
  
  type IngredientDetailResult = IngredientDetail | RecordNotFoundError;

  input IngredientInput {
    name: String!
    slug: String
    proof: Int
    parentId: String
    description: String
    imageURL: String
    spec: String
  }

  type Glassware {
    id: Int
    name: String
    iconURL: String
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
    subWith: Ingredient
  }

  type Spec {
    id: String
    slug: String
    author: String
    name: String
    source: String
    abv: Float
    preparationType: PreparationType
    glassware: Glassware
    contributedBy: User
    description: String
    ingredients: [SpecIngredient]
    directions: String
    riffOn: Spec
    reviews: [Review]
  }

  type SpecResult = Spec | RecordNotFoundError | RecordCouldNotBeUpdatedError;

  input SpecIngredientInput {
    quantity: Float
    measure: Measurement
    name: String!
    slug: String
    canSub: Boolean
    subWith: [String]
  }

  input SpecInput {
    name: String!
    description: String
    author: String
    source: String
    glasswareId: Int
    preparationType: String
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
    role: UserRole
    book: [Spec]
    shelf: [Ingredient]
  }

  type UserResult = User | RecordNotFoundError | RecordCouldNotBeUpdatedError | RecordAlreadyExistsInCollectionError;

  type UserRole {
    name: String
    id: Int
    permissions: [Permission]
  }

  type Permission {
    action: String
  }

  input UserInput {
    username: String!
    password: String!
    email: String!
    contribute: Boolean
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
    parent: StringFilterInput
  }

  input SpecFilterInput {
    name: StringFilterInput
    riffOn: StringFilterInput
    ingredients: IngredientFilterInput
  }

  type Mutation {
    editIngredient(id: String!, ingredient: IngredientInput): IngredientResult
    addIngredient(ingredient: IngredientInput): IngredientResult
    deleteIngredient(id: String!): IngredientResult
    createSpec(spec: SpecInput): SpecResult
    editSpec(id: String!, spec: SpecInput): SpecResult
    deleteSpec(id: String!): SpecResult
    addIngredientToShelf(id: String!): UserResult
    removeIngredientFromShelf(id: String!): UserResult
    addSpecToBook(id: String!): UserResult
    removeSpecFromBook(id: String!): UserResult
    signUp(
      username: String!
      password: String!
      email: String!
      contribute: Boolean
    ): User
    updateUser(username: String!, roleId: Int): UserResult
    login(username: String!, password: String!): UserToken
    deleteUser(id: String!): UserResult
    addReview(spec: String!, review: ReviewInput!): Review
    editReview(id: String!, review: ReviewInput!): Review
    deleteReview(id: String!): Review
  }

  type Query {
    ingredient(id: String, name: String, slug: String): IngredientDetail
    ingredients: [Ingredient]
    specs(filter: SpecFilterInput, limit: Int): [Spec]
    spec(id: String, name: String, slug: String): Spec
    users: [User]
    me: User
  }
`
