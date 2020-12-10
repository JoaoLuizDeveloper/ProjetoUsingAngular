export interface IPatient {
  id: BufferSource;
  name: string;
  cpf: string;
  birthDate: Date;
  dateCreated: Date;
  doctorId: BufferSource;
}
