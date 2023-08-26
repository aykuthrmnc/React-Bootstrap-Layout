import React from "react";
import { NonIndexRouteObject } from "react-router-dom";

//! TABLE
export interface TableObject {
  head: TableHeadObject[];
  body: TableBodyObject[] | any[];
  searchable?: boolean;
  asyncSearchable?: boolean;
  emptyMessage?: string;
  loading?: boolean;
  pagination?: { currentPage: any; totalCount: any; totalPages: any; pageSize: any };
  paginationCount?: boolean;
  inlineEditable?: boolean;
  creatable?: (e: any) => any;
  editable?: (e: any) => any;
  deletable?: (e: any) => any;
  children?: React.ReactNode;
  // [x: string]: any;
}
interface TableHeadObject {
  name: string;
  sortable?: boolean;
  width?: string;
  key: string;
  center?: boolean;
  type?: string;
  options?: any[];
}
interface TableBodyObject {
  value?: string;
  label?: string;
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