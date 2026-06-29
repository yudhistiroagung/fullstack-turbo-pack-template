import corsMiddleware from './cors-middleware';
import injectMiddleware from './injection-middleware';

export default {
  preMiddlewares: [corsMiddleware, injectMiddleware],
};
