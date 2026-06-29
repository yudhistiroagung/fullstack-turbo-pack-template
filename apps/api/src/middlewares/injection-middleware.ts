import { createMiddleware } from 'hono/factory';

import config from '../config';
import { getDB } from '../db/mongo-db';
import { TodoRepository } from '../repositories/todo-repository';
import { TodoService } from '../services/todo-service';

const injectMiddleware = createMiddleware(async (c, next) => {
    const db = getDB();

    /* collections factory */
    const todoCollection = db.collection(config.collections.todos);

    /* repositories factory */
    const todoRepository = new TodoRepository({
        collection: todoCollection,
    });

    /* repositories factory */
    const todoService = new TodoService({
        repository: todoRepository,
    });

    c.set('todoCollection', todoCollection);
    c.set('todoRepository', todoRepository);
    c.set('todoService', todoService);
    await next();
});

export default injectMiddleware;