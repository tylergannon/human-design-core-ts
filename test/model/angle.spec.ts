import { angle as _angle } from '$hd/models'
import { Just } from 'purify-ts'

const { add, cos, sin, toFloat, angle } = _angle

describe('Angle', () => {
    it('Computes its decimal value', () => {
        expect(Just(angle(27, 6, 0)).map(toFloat).extract()).toBe(27.1)
    })
    it('Can be added', () => {
        expect([angle(27, 3, 1), angle(12, 56, 59)].reduce(add)).toEqual(angle(40))
    })
    it('Computes the cosine', () => {
        expect(cos(angle(60))).toBeCloseTo(0.5, 5)
    })
    it('Computes the sine', () => {
        expect(sin(angle(30))).toBeCloseTo(0.5, 5)
    })
})
