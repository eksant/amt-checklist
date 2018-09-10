export const message = msg => {
  return msg.replace('GraphQL error: ValidationError: ', '')
}
