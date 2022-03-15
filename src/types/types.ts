export type Player = {
  playerId: string;
  firstName: string;
  lastName: string;
  teamId: number;
}

export type Team = {
  id: string;
  name: string;
  abbreviation: string;
  location: string;
  teamId: number;
}

export type UserRegister = {
  nickname: string;
  email: string;
  password: string;
}

export type UserLogin = {
  nickname: string;
  password: string;
}