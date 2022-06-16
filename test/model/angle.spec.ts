import { Angle } from '$hd'

describe('Angle', () => {
    it('Computes its decimal value', () => {
        expect(Angle.of(27, 6, 0).toFloat()).toBe(27.1)
    })
    it('Can be added', () => {
        expect(Angle.of(27, 3, 1).plus(Angle.of(12, 56, 59)).toFloat()).toBe(40)
    })
    it('Computes the cosine', () => {
        expect(Angle.of(60).cos).toBeCloseTo(0.5, 5)
    })
    it('Computes the sine', () => {
        expect(Angle.of(30).sin).toBeCloseTo(0.5, 5)
    })
})
