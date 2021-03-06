import { SignUpController } from './signup-controller'
import { AddAccount, Validation, Authentication } from './signup-controller-protocol'
import { MissingParamError, ServerError, EmailInUseError } from '@/presentation/errors'
import { HttpRequest } from '@/presentation/protocols'
import { ok, serverError, badRequest, forbidden } from '@/presentation/helpers/http/http-helper'
import { throwError } from '@/domain/test'
import { mockValidation, mockAddAccount, mockAuthentication } from '@/presentation/test'

const mockRequest = (): HttpRequest => {
  return {
    body: {
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
  }
}

type SutTypes = {
  sut: SignUpController
  addAccountStub: AddAccount
  validationStub: Validation
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  const addAccountStub = mockAddAccount()
  const validationStub = mockValidation()
  const authenticationStub = mockAuthentication()
  const sut = new SignUpController(addAccountStub, validationStub, authenticationStub)
  return {
    sut,
    addAccountStub,
    validationStub,
    authenticationStub
  }
}

describe('SignUp Controller', () => {
  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut() // system under test - class/controller... test instance
    const addSpy = jest.spyOn(addAccountStub, 'add')

    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
  })
  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })
  test('Should return 403 if AddAccount returns null', async () => {
    const { sut, addAccountStub } = makeSut() // system under test - class/controller... test instance
    jest.spyOn(addAccountStub, 'add').mockReturnValueOnce(Promise.resolve(null))
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })
  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut() // system under test - class/controller... test instance
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({ accessToken: 'any_token', name: 'any_name' }))
  })
  test('Should return validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut() // system under test - class/controller... test instance
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_email@email.com',
      password: 'any_password'
    })
  })
  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(throwError)
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
