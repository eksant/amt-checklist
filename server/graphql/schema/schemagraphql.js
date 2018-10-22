const { gql } = require('apollo-server-express')

module.exports = gql`
  type Query {
    admins: [User!]
    admin(id: ID!): User!
    users: [User!]
    user(id: ID!): User!
    mobiltangkis: [MobilTangki!]
    mobiltangki(id: ID!): MobilTangki!
    checklists: [CheckList!]
    checklist(id: ID!): CheckList!
  }

  type Mutation {
    signIn(username: String!, password: String!): UserLogin!
    createAdmin(admin: AdminInput!): User!
    createUser(user: UserInput!): User!
    updateAdmin(id: ID!, admin: AdminInput!): User!
    updateUser(id: ID!, user: UserInput!): User!
    deleteAdmin(id: ID!): Boolean
    deleteUser(id: ID!): Boolean
    createMobilTangki(mobiltangki: MobilTangkiInput!): MobilTangki!
    updateMobilTangki(id: ID!, mobiltangki: MobilTangkiInput!): MobilTangki!
    deleteMobilTangki(id: ID!): Boolean
    createCheckList(checklist: CheckListInput!): CheckList!
    updateCheckList(id: ID!, checklist: CheckListInput!): CheckList!
    deleteCheckList(id: ID!): Boolean
  }

  type User {
    _id: ID!
    username: String
    NIP: String
    fullName: String
    email: String
    mobile: String
    password: String
    roles: RoleAccess
    status: StatusActive
    imgUrl: String
    createdAt: String
    createdBy: User
  }

  input AdminInput {
    NIP: String!
    fullName: String
    email: String!
    mobile: String
    username: String!
    password: String
    status: StatusActive!
    imgUrl: String
  }

  input UserInput {
    NIP: String!
    fullName: String
    email: String!
    mobile: String
    username: String!
    password: String
    roles: RoleAccess!
    status: StatusActive!
    imgUrl: String
  }

  type UserLogin {
    user: User!
    token: String!
  }

  input SignInInput {
    username: String!
    password: String!
  }

  type MobilTangki {
    _id: ID!
    nopol: String
    KL: String
    year: String
    status: StatusActive
    createdAt: String
    createdBy: User
  }

  input MobilTangkiInput {
    nopol: String!
    KL: String
    year: Int
    status: StatusActive!
  }

  type CheckList {
    _id: ID!
    createdBy: User
    mobiltangki: MobilTangki
    status: StatusApproval
    ritase: Int
    odoKM: Int
    HSSE: Int
    PWSAMT: String
    TBBM: String
    remarks: String
    imgUrl: String
    kondisiRem: Int
    kondisiRemReason: String
    kondisiBan: Int
    kondisiBanReason: String
    kondisiWiper: Int
    kondisiWiperReason: String
    kondisiLampu: Int
    kondisiLampuReason: String
    kondisiKompartemen: Int
    kondisiKompartemenReason: String
    kondisiApar: Int
    kondisiAparReason: String
    kondisiOliMesin: Int
    kondisiOliMesinReason: String
    kondisiAirRadiator: Int
    kondisiAirRadiatorReason: String
    keberadaanSTNK: Int
    keberadaanSTNKReason: String
    keberadaanSuratKeur: Int
    keberadaanSuratKeurReason: String
    keberadaanSuratTera: Int
    keberadaanSuratTeraReason: String
    keberadaanP3K: Int
    keberadaanP3KReason: String
    keberadaanFlameTrap: Int
    keberadaanFlameTrapReason: String
    keberadaanBanSerep: Int
    keberadaanBanSerepReason: String
    keberadaanToolkit: Int
    keberadaanToolKitReason: String
    keberadaanGroundingCable: Int
    keberadaanGroundingCableReason: String
    keberadaanSelangBongkar: Int
    keberadaanSelangBongkarReason: String
    keberadaanSpillKit: Int
    keberadaanSpillKitReason: String
    membawaSIM: Int
    membawaSIMReason: String
    membawaSuratIjinArea: Int
    membawaSuratIjinAreaReason: String
    membawaBukuSaku: Int
    membawaBukuSakuReason: String
    membawaCatatanPerjalanan: Int
    membawaCatatanPerjalananReason: String
    menggunakanSeragam: Int
    menggunakanSeragamReason: String
    menggunakanSafetyShoes: Int
    menggunakanSafetyShoesReason: String
    menggunakanSafetyHelm: Int
    menggunakanSafetyHelmReason: String
    menggunakanIDCard: Int
    menggunakanIDCardReason: String
    menggunakanSarungTangan: Int
    menggunakanSarungTanganReason: String
    menggunakanJasHujan: Int
    menggunakanJamHujanReason: String
  }

  input CheckListInput {
    # createdBy: User
    mobiltangki: MobilTangkiInput
    status: StatusApproval
    ritase: Int
    odoKM: Int
    HSSE: Int
    PWSAMT: String
    TBBM: String
    remarks: String
    imgUrl: String
    kondisiRem: Int
    kondisiRemReason: String
    kondisiBan: Int
    kondisiBanReason: String
    kondisiWiper: Int
    kondisiWiperReason: String
    kondisiLampu: Int
    kondisiLampuReason: String
    kondisiKompartemen: Int
    kondisiKompartemenReason: String
    kondisiApar: Int
    kondisiAparReason: String
    kondisiOliMesin: Int
    kondisiOliMesinReason: String
    kondisiAirRadiator: Int
    kondisiAirRadiatorReason: String
    keberadaanSTNK: Int
    keberadaanSTNKReason: String
    keberadaanSuratKeur: Int
    keberadaanSuratKeurReason: String
    keberadaanSuratTera: Int
    keberadaanSuratTeraReason: String
    keberadaanP3K: Int
    keberadaanP3KReason: String
    keberadaanFlameTrap: Int
    keberadaanFlameTrapReason: String
    keberadaanBanSerep: Int
    keberadaanBanSerepReason: String
    keberadaanToolkit: Int
    keberadaanToolKitReason: String
    keberadaanGroundingCable: Int
    keberadaanGroundingCableReason: String
    keberadaanSelangBongkar: Int
    keberadaanSelangBongkarReason: String
    keberadaanSpillKit: Int
    keberadaanSpillKitReason: String
    membawaSIM: Int
    membawaSIMReason: String
    membawaSuratIjinArea: Int
    membawaSuratIjinAreaReason: String
    membawaBukuSaku: Int
    membawaBukuSakuReason: String
    membawaCatatanPerjalanan: Int
    membawaCatatanPerjalananReason: String
    menggunakanSeragam: Int
    menggunakanSeragamReason: String
    menggunakanSafetyShoes: Int
    menggunakanSafetyShoesReason: String
    menggunakanSafetyHelm: Int
    menggunakanSafetyHelmReason: String
    menggunakanIDCard: Int
    menggunakanIDCardReason: String
    menggunakanSarungTangan: Int
    menggunakanSarungTanganReason: String
    menggunakanJasHujan: Int
    menggunakanJamHujanReason: String
  }

  enum StatusActive {
    Active
    NonActive
  }

  enum StatusApproval {
    Waiting
    Request
    Approved
    Rejected
  }

  enum RoleAccess {
    Superadmin
    Admin
    Sopir
    Kernet
  }
`
