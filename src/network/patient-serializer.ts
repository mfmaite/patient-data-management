import { Patient, RawPatient } from "./types/patient";

class PatientSerializer {
  static deserialize(data: RawPatient): Patient {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      createdAt: new Date(data.createdAt),
      avatar: data.avatar,
      website: data.website,
    }
  }
}

export { PatientSerializer };
