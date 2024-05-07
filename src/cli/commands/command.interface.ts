export interface Command {
  name: string;
  execute(...parameters: string[]): Promise<void> | void;
}
