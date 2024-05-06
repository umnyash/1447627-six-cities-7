import chalk from 'chalk';

import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
import { Offer, FileReaderEvent, CommandName } from '../../shared/types/index.js';
import { getErrorMessage } from '../../shared/helpers/index.js';

export class ImportCommand implements Command {
  private onImportedOffer(offer: Offer): void {
    console.info(offer);
  }

  private onCompleteOffer(count: number): void {
    console.info(`${count} rows imported.`);
  }

  public getName(): string {
    return `--${CommandName.Import}`;
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;

    if (!filename) {
      console.error(chalk.hex('ff0000')('The path to the file is not specified.'));
      return;
    }

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on(FileReaderEvent.Line, this.onImportedOffer);
    fileReader.on(FileReaderEvent.End, this.onCompleteOffer);

    try {
      fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
