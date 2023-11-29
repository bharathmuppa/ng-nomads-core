import {AppEnvironment} from "./environment.interface";

export const environment: AppEnvironment = {
  production: false,
  userServiceURL: '/api/user-service',
  secret: "",
  userImageURL: '',
  gdsURL: '/api/gds-service/users'
};
