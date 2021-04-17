#!/usr/bin/env node
import { spawn } from 'child_process';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv))
    .locale('en')
    .strictOptions()
    .option('symbolic', {
        alias: 's',
        type: 'boolean',
        description: 'Make symbolic links instead of hard links',
    })
    .check((argv) => {
        const args = argv._;
        if (args.length !== 2) {
            throw new Error(`Expected 2 arguments but ${args.length} was given`);
        } else {
            return true;
        }
    })
    .argv;

void async function main(argv) {
    const child = spawn('New-Item', ['-Type', argv.symbolic ? 'SymbolicLink' : 'HardLink', argv._[1], '-Value', argv._[0]], { shell: 'powershell' });
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
    child.on('error', err => console.error(err));
}(argv);
