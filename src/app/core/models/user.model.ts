import { RoleName } from "./rol.model";

export interface User {
  id: string;
  email: string;
  password: string; // sólo en mocks
  name: string;
  role: RoleName;
  permissions: string[]; // claims
  accessToken?: string;
  expiresIn?: number;
  user: { id: string; email: string; role: RoleName; permissions: string[] };
}

