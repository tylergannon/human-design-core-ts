/**
 * FastAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * OpenAPI spec version: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import type { Angle } from './Angle';
import type { ObjectSpeed } from './ObjectSpeed';
import type { Scientific } from './Scientific';
import type { SignedAngle } from './SignedAngle';
import type { Zodiac } from './Zodiac';

export class Position {
    'lng': Angle;
    'lat': SignedAngle;
    'distance': Scientific;
    'speed': ObjectSpeed;
    'zodiac': Zodiac;
    'zodiacLng': Angle;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "lng",
            "baseName": "lng",
            "type": "Angle",
            "format": ""
        },
        {
            "name": "lat",
            "baseName": "lat",
            "type": "SignedAngle",
            "format": ""
        },
        {
            "name": "distance",
            "baseName": "distance",
            "type": "Scientific",
            "format": ""
        },
        {
            "name": "speed",
            "baseName": "speed",
            "type": "ObjectSpeed",
            "format": ""
        },
        {
            "name": "zodiac",
            "baseName": "zodiac",
            "type": "Zodiac",
            "format": ""
        },
        {
            "name": "zodiacLng",
            "baseName": "zodiacLng",
            "type": "Angle",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return Position.attributeTypeMap;
    }

    public constructor() {
    }
}
