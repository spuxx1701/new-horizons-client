/* eslint-disable no-console */
import Service, { service } from '@ember/service';
import SettingsService from './settings';

export type MessageType = 'debug' | 'info' | 'success' | 'warning' | 'error';

export interface Message {
  timestamp: string;
  type: MessageType;
  text: string;
  context?: string;
  error?: unknown | Error;
}

export default class LoggerService extends Service {
  @service declare settings: SettingsService;
  messages: Message[] = [];

  /**
   * Logs a message of type 'debug'. Message will not be created
   * if debug mode is disabled.
   * @param text The message text.
   * @param context (optional) The context.
   */
  debug(text: string, context?: string) {
    if (!this.settings.getValue('debug')) return;
    this.createMessage(text, { context, type: 'debug' });
  }

  /**
   * Logs a message of type 'info'.
   * @param text The message text.
   * @param context (optional) The context.
   */
  info(text: string, context?: string) {
    this.createMessage(text, { context, type: 'info' });
  }

  /**
   * Logs a message of type 'success'.
   * @param text The message text.
   * @param context (optional) The context.
   */
  success(text: string, context?: string) {
    this.createMessage(text, { context, type: 'success' });
  }

  /**
   * Logs a message of type 'warning'.
   * @param text The message text.
   * @param context (optional) The context.
   * @param error (optional) An error or exception.
   */
  warning(text: string, context?: string, error?: unknown | Error) {
    this.createMessage(text, { context, type: 'warning', error });
  }

  /**
   * Logs a message of type 'error'.
   * @param text The message text.
   * @param context (optional) The context.
   * @param error (optional) An error or exception.
   */
  error(text: string, context?: string, error?: unknown | Error) {
    this.createMessage(text, { context, type: 'error', error });
  }

  /**
   * Creates the given message.
   * @param text The message text.
   * @param options An optional options object.
   */
  private createMessage(
    text: string,
    options: { type: MessageType; context?: string; error?: unknown | Error }
  ) {
    const message = {
      text,
      type: options.type,
      timestamp: new Date().toISOString(),
      context: options.context,
      error: options.error,
    };
    this.messages.push(message);
    this.printMessageToConsole(message);
  }

  /**
   * Prints the given message to console if debug mode is enabled.
   * @param message The message.
   */
  private printMessageToConsole(message: Message) {
    if (!this.settings.getValue('debug')) return;
    switch (message.type) {
      case 'debug':
        console.debug(this.parseMessage(message));
        break;
      case 'warning':
        console.warn(this.parseMessage(message));
        break;
      case 'error':
        console.error(this.parseMessage(message));
        break;
      default:
        console.log(this.parseMessage(message));
    }
  }

  /**
   * Parses the given `Message` to a console-friendly string.
   * @param message The message.
   * @returns The string output.
   */
  private parseMessage(message: Message) {
    let output = `${message.type.toUpperCase()}:`;
    if (message.context) {
      output += ` [${message.context}]`;
    }
    output += ` ${message.text}`;
    return output;
  }
}
