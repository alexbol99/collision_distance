'use strict';

import {expect} from 'chai';
import {collisionDistance, segment2segment, segment2arc, arc2arc} from './index';

import {Polygon, CW, CCW} from "@flatten-js/core";
import {point, vector, circle, line, segment, arc, ray} from "@flatten-js/core"
//
// let {Distance} = Flatten;

describe('#CollisionDistance', function() {
    it('Class CollisionDistance defined', function() {
        expect(collisionDistance).to.exist;
    });
    it('Can calculate collision distance between two segments', function() {
        let segment1 = segment(point(0,0), point(10,10));
        let segment2 = segment(point(20,5), point(25, 3));
        let distance = segment2segment(segment1, segment2);
        expect(distance).to.equal(15);
        let v_trans = vector(-1, 0).multiply(distance);
        let seg_trans = segment(segment2.ps.translate(v_trans), segment2.pe.translate(v_trans));
        let ip = segment1.intersect(seg_trans);
        expect(ip.length).to.equal(1);
    });
    it('Can calculate collision distance between segment and arc', function() {
        let arca = arc(point(0,5), 5, -Math.PI/2, Math.PI/2, CCW);
        let segb = segment(point(20,0), point(20, 10));
        let distance = segment2arc(segb, arca);
        expect(distance).to.equal(15);

        let v_trans = vector(-1, 0).multiply(distance);
        let seg_trans = segb.translate(v_trans);
        let ip = arca.intersect(seg_trans);
        expect(ip.length).to.equal(1);
    });
    it('Can calculate collision distance between two arcs', function() {
        let arc1 = arc(point(0,5), 5, -Math.PI/2, Math.PI/2, CCW);
        let arc2 = arc(point(10,2), 2, -Math.PI/2, Math.PI/2, CW);
        let distance = arc2arc(arc1, arc2);
        console.log(distance);
        expect(distance).to.be.above(0);

        let [dist_tmp, shortest_segment_tmp] =
            arc1.distanceTo(arc2.translate(vector(-distance,0)));
        expect(dist_tmp).to.equal(0);

        let ip = arc1.intersect(arc2.translate(vector(-distance,0)));
        expect(ip.length).to.equal(1);
    });
    it('Can calculate collision distance between two polygons', function() {
        let poly1 = new Polygon();
        poly1.addFace(
            [point(10,10), point(110,10), point(80, 75), point(110,110),point(10,110)]
        );
        let poly2 = new Polygon();
        poly2.addFace(
            [point(290,80), point(260, 40), point(300,30), point(350,80),point(300,130), point(260, 150)]
        );
        let collision = collisionDistance(poly1, poly2);
        let poly3 = poly2.translate(vector(-collision,0));
        let [distance, shortest_segment] = poly1.distanceTo(poly3);
        expect(distance).to.equal(0);
    });
});
