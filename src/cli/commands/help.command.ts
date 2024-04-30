import chalk from 'chalk';
import { Command } from './command.interface.js';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
      ${chalk.bgWhite.bold(' Программа для подготовки данных для REST API сервера. ')}

      Пример:
          ${chalk.hex('009d91')('cli.js')} ${chalk.hex('fffc00')('--<command>')} ${chalk.hex('ff6f00')('[--arguments]')}

      Команды:
          ${chalk.hex('fffc00')('--version')}:                    # выводит номер версии
          ${chalk.hex('fffc00')('--help')}:                       # печатает этот текст
          ${chalk.hex('fffc00')('--import')} ${chalk.hex('ff6f00')('<path>')}:              # импортирует данные из TSV
          ${chalk.hex('fffc00')('--generate')} ${chalk.hex('ff6f00')('<n> <path> <url>')}:  # генерирует произвольное количество тестовых данных
    `);
  }
}
