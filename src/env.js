import dotenv from 'dotenv';
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

export default dotenv.config({silent: true, path: path.resolve(__dirname, './env')})