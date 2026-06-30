import corsMiddleware from './cors-middleware';
import { apiKeyMiddleware } from './api-key-middleware';
import injectMiddleware from './injection-middleware';

export default {
  preMiddlewares: [corsMiddleware, apiKeyMiddleware, injectMiddleware],
};
