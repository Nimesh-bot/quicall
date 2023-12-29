export interface IResponseFromAxios {
  data: IResponseFromAPI;
}
export interface IResponseFromAPI {
  data: IResponseData[];
  meta: IMeta;
}
export interface IResponseData {
  id: string;
  attributes: IUsersAttributes;
}
export interface IUsersAttributes {
  name: string;
  username: string;
  email: string;
  contact: string;
  isActive: boolean;
}
export interface IMeta {
  pagination: IPagination;
}
export interface IPagination {
  total: number;
  pageSize: number;
  page: number;
  pageCount: number;
}

export interface ITransformedResponse {
  id: string;
  name: string;
  username: string;
  email: string;
  contact: string;
  isActive: boolean;
}
