import { ApiRoutes } from "./api-routes";
import { PatientSerializer } from "./patient-serializer";

const fetchOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
}

class PatientController {
  static async getPatients() {
    const response = await fetch(ApiRoutes.GET_PATIENTS, fetchOptions);
    if (!response.ok) throw new Error('Error retrieving patients');

    const responseData = await response.json();
    return responseData.map(PatientSerializer.deserialize);
  }
}

export { PatientController };
