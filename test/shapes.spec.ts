import { select } from 'd3-selection'
import { JSDOM } from 'jsdom'
import { roundedSquare } from '$hd/shapes/roundedPolygon'
import { Angle } from '$hd/models'

describe('roundedTriangle', () => {
    it('Draws correctly', () => {
        const shape = roundedSquare({ height: 100, width: 100 }, { x: 0, y: 0 }, Angle.of(45))
        const dom = new JSDOM()
        const selection = select(dom.window.document.body)
        const svg = selection
            .append('svg')
            .attr('viewBox', [-100, -100, 200, 200])
            .attr('stroke', 'black')
            .attr('stroke-width', 0.75)
            .style('max-width', '640px')
            .style('display', 'block')
            .style('margin', 'auto')
            .style('border', '2px solid black')

        const frame = svg.append('g')

        frame
            .selectAll('path')
            .data([shape])
            .join('path')
            .attr('fill', 'red')
            .attr('d', path => path)

        // await writeFile("test.html", `<html><body>${svg.node()?.outerHTML}</body></html>`)
        // expect(shape).toBe('zorg')
    })
})
