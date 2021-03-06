import { AddAccount, AddAccountParams, AccountModel } from '@/presentation/controllers/login/signup/signup-controller-protocol'
import { mockAccountModel } from '@/domain/test'
import { Authentication, AuthenticationParams } from '@/domain/usecases/account/authentication'
import { LoadAccountByToken } from '@/presentation/middlewares/authentication/auth-middleware-protocols'
import { AuthenticationModel } from '@/domain/models/authentication'

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: AuthenticationParams): Promise<AuthenticationModel> {
      return Promise.resolve({
        accessToken: 'any_token',
        name: 'any_name'
      })
    }
  }

  return new AuthenticationStub()
}

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountParams): Promise<AccountModel> {
      const fakeAccount = mockAccountModel()
      return await new Promise(resolve => resolve(fakeAccount))
    }
  }
  return new AddAccountStub()
}

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string, role?: string): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel())
    }
  }
  return new LoadAccountByTokenStub()
}
