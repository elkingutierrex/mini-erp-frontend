import { RoleName } from "./rol.model";

export interface User {
  id: string;
  email: string;
  password: string; // sólo en mocks
  name: string;
  role: RoleName;
  permissions: string[]; // claims
  token?: string;
}

