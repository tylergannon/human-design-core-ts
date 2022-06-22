import { mapObjIndexed, multiply } from 'ramda'
import type { Offset, Measurement } from './types'

/**
 * @internal
 * @param arg1 -
 * @param arg2 -
 * @returns
 */
export function add<T extends Measurement>(arg1: T, arg2: T): T {
    return mapObjIndexed((val, key) => val + arg2[key], arg1) as T
}

/**
 * Multiply x and y of offset by the scalar amount.
 * @public
 * @param offset -  The offset to scale
 * @param scale -  The scale by which to multiply offset
 */
export function scale(offset: Offset, scale: number): Offset
export function scale<T extends Measurement>(obj: Measurement, scale: number): T {
    return mapObjIndexed(multiply(scale), obj) as T
}

/**
 * A record that represents a typed fanning-out of a single value
 * according to named transformations that result in the same time.
 * @internal
 */
export type Transformer<T, U, V = any> = Record<keyof V, (val: T) => U>

/**
 * @internal
 * but what about the type of transform that maps an object based on other poopoo
 */
export function transformObj<T, U, V extends Record<string, T>>(
    source: V,
    transformer: Record<keyof typeof source, (val: T) => U>
) {
    return mapObjIndexed((val, key) => transformer[key](val), source)
}

/**
 * Fans out properties of [value]
 * @param value -
 * @param transformer -
 * @returns an object with the same key as [transformer], where values are mapped from its functions.
 * @internal
 */
export function transform<T, U, V>(value: T, transformer: Transformer<T, U, V>): Record<keyof V, U> {
    return mapObjIndexed(fn => fn(value), transformer) as Record<keyof V, U>
}
