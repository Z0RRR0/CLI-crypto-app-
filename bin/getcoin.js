#!/usr/bin/env node
import { Command } from "commander"         //for using commands
import { readFileSync } from 'fs';          //for resolving temporary or beta warnings.
// import pkg from '../package.json' assert { type: 'json' };
const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));    //importing package.json with readFileSync.

const program = new Command

program
    .version(pkg.version)
    .command('key', 'Manage API Key -- https://nomics.com')
    .command('check', 'Check Coin Price Info')
    .parse(process.argv)