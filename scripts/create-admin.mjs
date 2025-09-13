import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import { createUser } from '../lib/auth.js';

const rl = readline.createInterface({ input, output });
const email = await rl.question('Admin email: ');
const pass = await rl.question('Admin password: ');
await createUser(email, pass, 'admin');
console.log('Admin created:', email);
rl.close();