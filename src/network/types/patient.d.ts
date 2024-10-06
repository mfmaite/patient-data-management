export type Patient = {
  id: string,
  name: string,
  createdAt: Date,
  avatar: string,
  description: string;
  website: string,
}

export type RawPatient = {
  id: string,
  name: string,
  createdAt: string,
  avatar: string,
  description: string;
  website: string,
}
