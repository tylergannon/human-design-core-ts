import { select } from 'd3-selection'
import { JSDOM } from 'jsdom'
import { roundedTriangle } from '$hd/shapes/roundedPolygon'

describe('roundedTriangle', () => {
    it('Draws correctly', () => {
        const shape = roundedTriangle({ height: 100, width: 100 }, { x: 100, y: 100 })
        const dom = new JSDOM()
        const selection = select(dom.window.document.body)
        const svg = selection
            .append('svg')
            .attr('viewBox', [-499, 0, 1000, 1500])
            .attr('stroke', 'black')
            .attr('stroke-width', 0.75)
            .style('max-width', '640px')
            .style('display', 'block')
            .style('margin', 'auto')

        const frame = svg.append('g')

        frame
            .selectAll('path')
            .data([shape])
            .join('path')
            .attr('fill', 'red')
            .attr('d', path => path)

        expect(shape).toBe('zorg')
    })
})
