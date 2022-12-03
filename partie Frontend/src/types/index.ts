export interface User {
  id: string;
  name: string;
  role: Role[];
}

export interface Material {
  id: string;
  name: string;
  description: string;
  categoryIds: string[];
}

export interface MaterialDto extends Material {
  archived: boolean;
}

export enum Filter {
  ALL = 'Tout',
  ARCHIVED = 'Archivées',
}

export enum DemandStatus {
  REFUSED = 'REFUSED',
  ACCEPTED = 'ACCEPTED',
}

export interface Demand {
  id: string;
  offerTitle: string;
  demanderUsername: string;
  status: DemandStatus;
  archived: boolean;
}

export interface Category {
  id: string;
  name: string;
}

export enum Role {
  ROLE_MEMBER = 'ROLE_MEMBER',
  ROLE_REPRESENTATIVE = 'ROLE_REPRESENTATIVE',
}

export interface State {
  auth: {
    token: string | null;
    user?: User | null;
    error?: string;
  };
}

export interface Action {
  type: string;
  payload: any | null;
}
