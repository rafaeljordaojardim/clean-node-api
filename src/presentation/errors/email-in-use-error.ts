export class EmailInUseError extends Error {
  constructor () {
    super('The received email is alreary in use')
    this.name = 'EmailInUseError'
  }
}
