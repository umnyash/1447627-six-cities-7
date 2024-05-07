import chalk from 'chalk';
import { Command } from './command.interface.js';
import { CommandName } from '../../shared/types/index.js';

export class HelpCommand implements Command {
  get name() {
    return `--${CommandName.Help}`;
  }

  public execute(..._parameters: string[]): void {
    console.info(`
      ${chalk.bgWhite.bold(' Программа для подготовки данных для REST API сервера. ')}

      Пример:
          ${chalk.hex('009d91')('cli.js')} ${chalk.hex('fffc00')('--<command>')} ${chalk.hex('ff6f00')('[--arguments]')}

      Команды:
          ${chalk.hex('fffc00')(`--${CommandName.Version}`)}:                    # выводит номер версии
          ${chalk.hex('fffc00')(`--${CommandName.Help}`)}:                       # печатает этот текст
          ${chalk.hex('fffc00')(`--${CommandName.Import}`)} ${chalk.hex('ff6f00')('<path>')}:              # импортирует данные из TSV
          ${chalk.hex('fffc00')(`--${CommandName.Generate}`)} ${chalk.hex('ff6f00')('<n> <path> <url>')}:  # генерирует произвольное количество тестовых данных
    `);
  }
}
