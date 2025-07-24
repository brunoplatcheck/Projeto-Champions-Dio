// utils/http-helper.ts
import { HttpResponse } from "../models/http-response-model";

export const ok = (data: any): HttpResponse => {
  return { statusCode: 200, body: data };
};

export const created = (data?: any): HttpResponse => {
  return { statusCode: 201, body: data || { message: "successful" } };
};

export const noContent = (): HttpResponse => {
  return { statusCode: 204, body: null };
};

export const badRequest = (error?: any): HttpResponse => {
  return { statusCode: 400, body: error || { message: "Bad Request" } };
};

export const notFound = (error?: any): HttpResponse => {
  return { statusCode: 404, body: error || { message: "Not Found" } };
};

export const internalServerError = (error?: any): HttpResponse => {
  return { statusCode: 500, body: error || { message: "Internal Server Error" } };
};