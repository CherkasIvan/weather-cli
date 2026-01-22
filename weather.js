#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { printHelp } from './services/log.service.js';

const initCli = () => {
  const args = getArgs(process.argv)
  if(args.h){
    printHelp('sadfsdf')
  } else if (args.s) {
    console.log('save City')
  } else if (args.t) {
    console.log('token')
  } else {
    console.log('weather')
  }
}

initCli() 