import { createMiddleware } from "hono/factory";

import config from '../config';
import { getDB } from '../db/mongo-db';
import { TodoRepository } from '../repositories/todo-repository';

export const injectMiddleware = createMiddleware(async (c, next) => {
    const db = getDB();

    /* collections factory */
    const todoCollection = db.collection(config.collections.todos);

    /* repositories factory */
    const todoRepository = new TodoRepository({
        collection: todoCollection,
    });

    /* repositories factory */

    c.set('todoCollection', todoCollection);
    c.set('todoRepository', todoRepository);
    next();
});

export default injectMiddleware;