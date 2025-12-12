export type RoleName = 'seller' | 'admin' | 'manager';

export interface Role {
  id: string;
  name: RoleName;
  permissions: string[];
}
