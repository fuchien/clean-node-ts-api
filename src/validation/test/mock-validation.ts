import { Validation } from '@/presentation/protocols'

export const mockValdation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}
