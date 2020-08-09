import { DbLoadSurveys } from './db-load.surveys'
import { LoadSurveysRepository } from './db-load-surveys-protocols'
import { throwError, mockSurveyModels } from '@/domain/test'
import { mockLoadSurveysRepository } from '@/data/test'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DbLoadSurveys
  loadSurveysRepositoryStub: LoadSurveysRepository
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = mockLoadSurveysRepository()
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
  return {
    sut,
    loadSurveysRepositoryStub
  }
}

describe('DbLoadSurveys', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const accountId = 'any_account_id'
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
    await sut.load(accountId)
    expect(loadAllSpy).toHaveBeenCalled()
  })
  test('Should return a list of Surveys on success', async () => {
    const { sut } = makeSut()
    const accountId = 'any_account_id'
    const surveys = await sut.load(accountId)
    expect(surveys).toEqual(mockSurveyModels())
  })
  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const accountId = 'any_account_id'
    jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.load(accountId)
    await expect(promise).rejects.toThrow()
  })
})
