import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.static('build/html'));

const server = app.listen(8080, () => {
    const { port } = server.address();
    console.log('Server started at http://localhost:%s', port);
});
