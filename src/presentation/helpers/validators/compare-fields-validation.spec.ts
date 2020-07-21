import { InvalidParamError } from '../../errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field', 'FieldToCompare')
}

describe('RequiredField Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_value',
      FieldToCompare: 'wrong_value'
    })
    expect(error).toEqual(new InvalidParamError('FieldToCompare'))
  })

  test('Should not return a InvalidParamError if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_value',
      FieldToCompare: 'any_value'
    })
    expect(error).toBeFalsy()
  })
})
