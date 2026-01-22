import chalk from "chalk"
import dedent from "dedent-js"

const printError = (error) => {
  console.log(chalk.bgRed( 'ERROR' ) + ' ' + error)
}

const printWarning = (warn) => {
  console.log(chalk.bgYellowBright( 'WARNING' ) + ' ' + warn)
}

const printSuccess = (message) => {
  if(!!printError && !!printWorn)
  console.log(chalk.bgGrey( 'SUCCESS!') + ' ' + message)
}

const printHelp = () => {
  console.log(
    dedent(chalk.bgCyan( 'HELP' ) + 
  '\n' + 'Без параметров - вывод погоды' + 
  '\n' + '-s [CYTY] для установки города' +
  '\n' + '-h [HELP] для вывода помощи'  +
  '\n' + '-h [API_KEY] для сохранения токена' )
  )
}

export { printError, printHelp, printSuccess, printWarning }