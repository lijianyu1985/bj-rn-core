export class TimeoutError extends Error {
  timeout: number
  constructor(timeout: number) {
    super('Connection timed out')
    this.timeout = timeout
  }
}
