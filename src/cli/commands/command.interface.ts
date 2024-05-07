export interface Command {
  get name(): string;
  execute(...parameters: string[]): Promise<void> | void;
}
