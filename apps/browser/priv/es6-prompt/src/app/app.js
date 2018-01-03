import { ConfReader } from './core/conf/confReader'
import { LoggerFactory } from './core/logger/loggerFactory'
/**
 * Application class, Entry point of the application
 */
class Application {
  /**
   * The main method, the entry point of the application
   * @param {Object} argv Arguments from process.argv
   */
  static main (argv) {
    const confName = argv[2] || 'dev'
    const configuration = new ConfReader().read(`${__dirname}/conf/${confName}.yml`)
    const logger = LoggerFactory.get('bunyan', {name: configuration.application.name})
    logger.info(`Application started on ${confName.toUpperCase()} mode`)
  }
}

// We run the main method of the Application class
Application.main(process.argv)
