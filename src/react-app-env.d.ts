/// <reference types="react-scripts" />
declare global {
  interface Response<T = {}> {
    success: boolean;
    errorMessage?: string;
    data: T;
  }
  interface IPagination<T> {
    success: boolean;
    errorMessage?: string;
    data: {
      list: T[];
      current: 1;
      pageSize: number;
      total: number;
      totalPage: number;
    };
  }
  interface Window {
    logout(): void;
  }
}
export {};
