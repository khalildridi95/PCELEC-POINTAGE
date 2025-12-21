import { createServer } from './server.js';
const port = process.env.PORT || 4000;
createServer().listen(port, () => console.log(`API on :${port}`));