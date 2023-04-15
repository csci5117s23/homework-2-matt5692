
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/

//backend based on tech stack demo from class

import {app, Datastore} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import { date, object, string, boolean } from 'yup';
import jwtDecode from 'jwt-decode';

const TodoYup = object({
    content: string().required(),
    done: boolean().required(),
    userId: string().required(),
    createdOn: date().default(() => new Date()),
});

const userAuth = async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      if (authorization) {
        const token = authorization.replace('Bearer ','');
        const token_parsed = jwtDecode(token);
        req.user_token = token_parsed;
      }
      next();
    } catch (error) {
      next(error);
    } 
}
app.use(userAuth)

// some extra logic for GET / and POST / requests.
app.use('/todo', (req, res, next) => {
    if (req.method === "POST") {
        req.body.userId = req.user_token.sub
    } else if (req.method === "GET") {
        req.query.userId = req.user_token.sub
    }
    next();
})

// some extra logic for GET /id and PUT /id DELETE /id PATCH /id requests.
// side effect here will break patch patch by query, but that's OK for my purposes.
app.use('/todo/:id', async (req, res, next) => {
    const id = req.params.ID;
    const userId = req.user_token.sub
    const conn = await Datastore.open();
    try {
        const doc = await conn.getOne('todo', id)
        if (doc.userId != userId) {
            res.status(403).end();
            return
        }
    } catch (e) {
        console.log(e);
        res.status(404).end(e);
        return;
    }
    next();
})


crudlify(app, {todo: TodoYup})


export default app.init();
