var expect = require('chai').expect;
var setup  = require(__dirname + '/lib/setup');
var fs     = require('fs');
var objects     = null;
var states      = null;
var connected   = false;

describe('feiertage: test adapter', function() {
    before('feiertage: Start js-controller', function (_done) {
        this.timeout(600000); // because of first install from npm

        setup.setupController(function () {
            var config = setup.getAdapterConfig();
            // enable adapter
            config.common.enabled  = true;
            config.common.loglevel = 'debug';

            setup.setAdapterConfig(config.common, config.native);

            setup.startController(function (_objects, _states) {
                objects = _objects;
                states  = _states;
                _done();
            });
        });
    });

    it('feiertage: wait', function (done) {
        this.timeout(5000);
        setTimeout(function () {
            done();
        }, 3000);
    });

    it('feiertage: next holiday must be set', function (done) {
        this.timeout(20000);
        states.getState('feiertage.0.naechster.Name', function (err, fileName) {
            expect(err).to.be.not.ok;
            expect(fileName).to.be.ok;
            expect(fileName.ack).to.be.true;
            states.getState('feiertage.0.naechster.Datum', function (err, fileName) {
                expect(err).to.be.not.ok;
                expect(fileName).to.be.ok;
                expect(fileName.ack).to.be.true;
                states.getState('feiertage.0.naechster.Dauer', function (err, fileName) {
                    expect(err).to.be.not.ok;
                    expect(fileName).to.be.ok;
                    expect(fileName.ack).to.be.true;
                    done();
                });
            });
        });
    });
    
    after('feiertage: Stop js-controller', function (done) {
        this.timeout(5000);
        setup.stopController(function () {
            done();
        });
    });
});