'use strict';

let expect = require('chai').expect;
let CollisionDistance = require('./index');
let Flatten = require('flatten-js');

let {Polygon} = Flatten;
let {point, vector, circle, line, segment, arc, ray} = Flatten;
//
// let {Distance} = Flatten;

describe('#CollisionDistance', function() {
    it('Class CollisionDistance defined', function() {
        expect(CollisionDistance).to.exist;
    });
    it('Can calculate collision distance between two segments', function() {
        let segment1 = segment(point(0,0), point(10,10));
        let segment2 = segment(point(20,5), point(25, 3));
        let distance = CollisionDistance.segment2segment(segment1, segment2);
        expect(distance).to.equal(15);
        let v_trans = vector(-1, 0).multiply(distance);
        let seg_trans = segment(segment2.ps.translate(v_trans), segment2.pe.translate(v_trans));
        let ip = segment1.intersect(seg_trans);
        expect(ip.length).to.equal(1);
    });
    it('Can calculate collision distance between segment and arc', function() {
        let arca = arc(point(0,5), 5, -Math.PI/2, Math.PI/2, Flatten.CCW);
        let segb = segment(point(20,0), point(20, 10));
        let distance = CollisionDistance.segment2arc(segb, arca);
        expect(distance).to.equal(15);

        let v_trans = vector(-1, 0).multiply(distance);
        let seg_trans = segment(segb.ps.translate(v_trans), segb.pe.translate(v_trans));
        let ip = arca.intersect(seg_trans);
        expect(ip.length).to.equal(1);
    });
    it('Can calculate collision distance between two arcs', function() {
        let arc1 = arc(point(0,5), 5, -Math.PI/2, Math.PI/2, Flatten.CCW);
        let arc2 = arc(point(10,2), 2, -Math.PI/2, Math.PI/2, Flatten.CW);
        let distance = CollisionDistance.arc2arc(arc1, arc2);
        console.log(distance);
        expect(distance).to.be.positive;

        let v_trans = vector(-1, 0).multiply(distance);
        let arct_trans = arc2.clone();
        arct_trans.pc = arc2.pc.translate(v_trans);
        let ip = arc1.intersect(arct_trans);
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
        let collision = CollisionDistance.apply(poly1, poly2);
        let poly3 = CollisionDistance.translate(poly2, vector(-collision,0));
        let [distance, shortest_segment] = poly1.distanceTo(poly3);
        expect(distance).to.equal(0);
    });
});
