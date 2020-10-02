import * as Typegen from 'nexus-plugin-prisma/typegen'
import * as Prisma from '@prisma/client';

// Pagination type
type Pagination = {
  first?: boolean
  last?: boolean
  before?: boolean
  after?: boolean
}

// Prisma custom scalar names
type CustomScalars = 'DateTime'

// Prisma model type definitions
interface PrismaModels {
  Match: Prisma.Match
  MatchReport: Prisma.MatchReport
  Member: Prisma.Member
  PlayerReport: Prisma.PlayerReport
  Team: Prisma.Team
  User: Prisma.User
}

// Prisma input types metadata
interface NexusPrismaInputs {
  Query: {
    matches: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'home_id' | 'away_id' | 'time' | 'field' | 'location' | 'created_at' | 'updated_at' | 'team_match_away_idToteam' | 'team_match_home_idToteam' | 'match_report' | 'player_report'
      ordering: 'id' | 'home_id' | 'away_id' | 'time' | 'field' | 'location' | 'created_at' | 'updated_at'
    }
    matchReports: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'match_id' | 'result' | 'winner_id' | 'loss_id' | 'team_match_report_loss_idToteam' | 'match' | 'team_match_report_winner_idToteam'
      ordering: 'id' | 'match_id' | 'result' | 'winner_id' | 'loss_id'
    }
    members: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'member_id' | 'team_id' | 'role' | 'cash' | 'user' | 'team'
      ordering: 'id' | 'member_id' | 'team_id' | 'role' | 'cash'
    }
    playerReports: {
      filtering: 'AND' | 'OR' | 'NOT' | 'match_id' | 'id' | 'player_id' | 'score' | 'assist' | 'match' | 'user'
      ordering: 'match_id' | 'id' | 'player_id' | 'score' | 'assist'
    }
    teams: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'logo' | 'description' | 'win' | 'loss' | 'home' | 'creator_id' | 'user' | 'match_match_away_idToteam' | 'match_match_home_idToteam' | 'match_report_match_report_loss_idToteam' | 'match_report_match_report_winner_idToteam' | 'member'
      ordering: 'id' | 'name' | 'logo' | 'description' | 'win' | 'loss' | 'home' | 'creator_id'
    }
    users: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'email' | 'password' | 'phone' | 'address' | 'member' | 'player_report' | 'team'
      ordering: 'id' | 'name' | 'email' | 'password' | 'phone' | 'address'
    }
  },
  Match: {
    player_report: {
      filtering: 'AND' | 'OR' | 'NOT' | 'match_id' | 'id' | 'player_id' | 'score' | 'assist' | 'match' | 'user'
      ordering: 'match_id' | 'id' | 'player_id' | 'score' | 'assist'
    }
  }
  MatchReport: {

  }
  Member: {

  }
  PlayerReport: {

  }
  Team: {
    match_match_away_idToteam: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'home_id' | 'away_id' | 'time' | 'field' | 'location' | 'created_at' | 'updated_at' | 'team_match_away_idToteam' | 'team_match_home_idToteam' | 'match_report' | 'player_report'
      ordering: 'id' | 'home_id' | 'away_id' | 'time' | 'field' | 'location' | 'created_at' | 'updated_at'
    }
    match_match_home_idToteam: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'home_id' | 'away_id' | 'time' | 'field' | 'location' | 'created_at' | 'updated_at' | 'team_match_away_idToteam' | 'team_match_home_idToteam' | 'match_report' | 'player_report'
      ordering: 'id' | 'home_id' | 'away_id' | 'time' | 'field' | 'location' | 'created_at' | 'updated_at'
    }
    match_report_match_report_loss_idToteam: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'match_id' | 'result' | 'winner_id' | 'loss_id' | 'team_match_report_loss_idToteam' | 'match' | 'team_match_report_winner_idToteam'
      ordering: 'id' | 'match_id' | 'result' | 'winner_id' | 'loss_id'
    }
    match_report_match_report_winner_idToteam: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'match_id' | 'result' | 'winner_id' | 'loss_id' | 'team_match_report_loss_idToteam' | 'match' | 'team_match_report_winner_idToteam'
      ordering: 'id' | 'match_id' | 'result' | 'winner_id' | 'loss_id'
    }
    member: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'member_id' | 'team_id' | 'role' | 'cash' | 'user' | 'team'
      ordering: 'id' | 'member_id' | 'team_id' | 'role' | 'cash'
    }
  }
  User: {
    member: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'member_id' | 'team_id' | 'role' | 'cash' | 'user' | 'team'
      ordering: 'id' | 'member_id' | 'team_id' | 'role' | 'cash'
    }
    player_report: {
      filtering: 'AND' | 'OR' | 'NOT' | 'match_id' | 'id' | 'player_id' | 'score' | 'assist' | 'match' | 'user'
      ordering: 'match_id' | 'id' | 'player_id' | 'score' | 'assist'
    }
    team: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'logo' | 'description' | 'win' | 'loss' | 'home' | 'creator_id' | 'user' | 'match_match_away_idToteam' | 'match_match_home_idToteam' | 'match_report_match_report_loss_idToteam' | 'match_report_match_report_winner_idToteam' | 'member'
      ordering: 'id' | 'name' | 'logo' | 'description' | 'win' | 'loss' | 'home' | 'creator_id'
    }
  }
}

// Prisma output types metadata
interface NexusPrismaOutputs {
  Query: {
    match: 'Match'
    matches: 'Match'
    matchReport: 'MatchReport'
    matchReports: 'MatchReport'
    member: 'Member'
    members: 'Member'
    playerReport: 'PlayerReport'
    playerReports: 'PlayerReport'
    team: 'Team'
    teams: 'Team'
    user: 'User'
    users: 'User'
  },
  Mutation: {
    createOneMatch: 'Match'
    updateOneMatch: 'Match'
    updateManyMatch: 'BatchPayload'
    deleteOneMatch: 'Match'
    deleteManyMatch: 'BatchPayload'
    upsertOneMatch: 'Match'
    createOneMatchReport: 'MatchReport'
    updateOneMatchReport: 'MatchReport'
    updateManyMatchReport: 'BatchPayload'
    deleteOneMatchReport: 'MatchReport'
    deleteManyMatchReport: 'BatchPayload'
    upsertOneMatchReport: 'MatchReport'
    createOneMember: 'Member'
    updateOneMember: 'Member'
    updateManyMember: 'BatchPayload'
    deleteOneMember: 'Member'
    deleteManyMember: 'BatchPayload'
    upsertOneMember: 'Member'
    createOnePlayerReport: 'PlayerReport'
    updateOnePlayerReport: 'PlayerReport'
    updateManyPlayerReport: 'BatchPayload'
    deleteOnePlayerReport: 'PlayerReport'
    deleteManyPlayerReport: 'BatchPayload'
    upsertOnePlayerReport: 'PlayerReport'
    createOneTeam: 'Team'
    updateOneTeam: 'Team'
    updateManyTeam: 'BatchPayload'
    deleteOneTeam: 'Team'
    deleteManyTeam: 'BatchPayload'
    upsertOneTeam: 'Team'
    createOneUser: 'User'
    updateOneUser: 'User'
    updateManyUser: 'BatchPayload'
    deleteOneUser: 'User'
    deleteManyUser: 'BatchPayload'
    upsertOneUser: 'User'
  },
  Match: {
    id: 'Int'
    home_id: 'Int'
    away_id: 'Int'
    time: 'DateTime'
    field: 'String'
    location: 'String'
    created_at: 'DateTime'
    updated_at: 'DateTime'
    team_match_away_idToteam: 'Team'
    team_match_home_idToteam: 'Team'
    match_report: 'MatchReport'
    player_report: 'PlayerReport'
  }
  MatchReport: {
    id: 'Int'
    match_id: 'Int'
    result: 'String'
    winner_id: 'Int'
    loss_id: 'Int'
    team_match_report_loss_idToteam: 'Team'
    match: 'Match'
    team_match_report_winner_idToteam: 'Team'
  }
  Member: {
    id: 'Int'
    member_id: 'Int'
    team_id: 'Int'
    role: 'member_role'
    cash: 'Int'
    user: 'User'
    team: 'Team'
  }
  PlayerReport: {
    match_id: 'Int'
    id: 'Int'
    player_id: 'Int'
    score: 'Int'
    assist: 'Int'
    match: 'Match'
    user: 'User'
  }
  Team: {
    id: 'Int'
    name: 'String'
    logo: 'String'
    description: 'String'
    win: 'Int'
    loss: 'Int'
    home: 'String'
    creator_id: 'Int'
    user: 'User'
    match_match_away_idToteam: 'Match'
    match_match_home_idToteam: 'Match'
    match_report_match_report_loss_idToteam: 'MatchReport'
    match_report_match_report_winner_idToteam: 'MatchReport'
    member: 'Member'
  }
  User: {
    id: 'Int'
    name: 'String'
    email: 'String'
    password: 'String'
    phone: 'String'
    address: 'String'
    member: 'Member'
    player_report: 'PlayerReport'
    team: 'Team'
  }
}

// Helper to gather all methods relative to a model
interface NexusPrismaMethods {
  Match: Typegen.NexusPrismaFields<'Match'>
  MatchReport: Typegen.NexusPrismaFields<'MatchReport'>
  Member: Typegen.NexusPrismaFields<'Member'>
  PlayerReport: Typegen.NexusPrismaFields<'PlayerReport'>
  Team: Typegen.NexusPrismaFields<'Team'>
  User: Typegen.NexusPrismaFields<'User'>
  Query: Typegen.NexusPrismaFields<'Query'>
  Mutation: Typegen.NexusPrismaFields<'Mutation'>
}

interface NexusPrismaGenTypes {
  inputs: NexusPrismaInputs
  outputs: NexusPrismaOutputs
  methods: NexusPrismaMethods
  models: PrismaModels
  pagination: Pagination
  scalars: CustomScalars
}

declare global {
  interface NexusPrismaGen extends NexusPrismaGenTypes {}

  type NexusPrisma<
    TypeName extends string,
    ModelOrCrud extends 'model' | 'crud'
  > = Typegen.GetNexusPrisma<TypeName, ModelOrCrud>;
}
  