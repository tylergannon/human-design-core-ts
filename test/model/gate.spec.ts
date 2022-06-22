import { Angle } from '$hd'
import { add, angle, OPPOSITE } from '$hd/models/Angle'
import { angleToGate } from '$hd/models/Gate'

describe('Angle to gate conversion', () => {
    const angles: Angle[] = [angle(17, 46, 55), angle(197, 46, 55)]
    it('adds', () => {
        expect(add(angles[0], OPPOSITE)).toEqual(angles[1])
    })

    it('converts one in aries', () => {
        expect(angleToGate(angles[0])).toEqual('51')
        expect(angleToGate(angles[1])).toEqual('57')
    })
})
