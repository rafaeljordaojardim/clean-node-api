export class EmailInUseError extends Error {
  constructor () {
    super('1The received email is alreary in use')
    this.name = 'EmailInUseError'
  }
}
