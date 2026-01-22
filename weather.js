#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { printHelp, printError, printSuccess } from './services/log.service.js';
import { saveKeyValue } from './services/storage.service.js';

const saveToken = async (token) => {
    try {
      await saveKeyValue('token', token)
      printSuccess('Токен сохронен')
  }
    catch(e) {
      printError('Токен не сохранен' + ' ' + e.message)  
  }
}

const initCli = () => {
  const args = getArgs(process.argv)
  if(args.h){
    printHelp('HELP')
  } else if (args.s) {
    console.log('save City')
  } else if (args.t) {
      saveKeyValue( 'token', args.t )
      return saveToken(args.t)
  } else {
    console.log('weather')
  }
}

initCli() 