import { NonIndexRouteObject } from "react-router-dom";

//! TABLE
export interface TableObject {
  head: TableHeadObject[];
  body: TableBodyObject[] | any;
  searchable?: boolean;
  emptyMessage?: string;
  loading?: boolean;
  children?: React.ReactNode;
}
interface TableHeadObject {
  name: string;
  sortable?: boolean;
  width?: string;
  center?: boolean;
}
export interface TableBodyObject {
  value?: string;
  type?: boolean;
  displayValue?: string;
}

//! ROUTER
export interface Route extends NonIndexRouteObject {
  children?: any;
  auth?: boolean;
  layout?: boolean;
  name?: string;
}

//! NODATA
export interface NoDataObject {
  size?: string;
  color?: string;
  title?: string;
}

//! REDUX - AUTH
export type Theme = "light" | "dark";

export interface Auth {
  user?: any;
  theme: Theme;
}
