import {AppEnvironment} from "./environment.interface";

export const environment: AppEnvironment = {
  production: true,
  secret: "<insert your secret here>",
  userServiceURL: 'api/user-service',
  userImageURL: '',
  gdsURL: ''
};
