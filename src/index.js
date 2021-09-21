import Express from 'express';
import ConnectDatabase from './database/connection';
import CreateAccount from './endpoints/User/createaccount';
import LoginUser from './endpoints/User/login';

const server = Express();
ConnectDatabase();

// Use public folder
server.use(Express.static('public'));
server.use(Express.json());

// Use routes
server.use('/user', CreateAccount);
server.use('/user', LoginUser);

server.get('/', (req, res) => {});

server.listen(8080, () => {
    console.log('server running on port 8080');
});
