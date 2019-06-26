var fs = require('fs');
var postcss = require('postcss');
var expect  = require('chai').expect;

var plugin = require('../');

var dir = './test/fixtures/';
var expectedExtension = /\.expected\.css$/;

var test = function (input, output, opts, done) {
	postcss([ plugin(opts) ]).process(input, {from: undefined}).then(function (result) {
		expect(result.css).to.eql(output);

		expect(result.warnings()).to.be.empty;

		done();
	}).catch(function (error) {
		done(error);
	});
};

fs.readdirSync(dir).filter(function (file) {
	return expectedExtension.test(file);
}).forEach(function (expectedFile) {
	var fixtureFile = expectedFile.replace(expectedExtension, '.css');
	var fixture = fs.readFileSync(dir + fixtureFile, 'utf8');

	var expected = fs.readFileSync(dir + expectedFile, 'utf8');

	describe(fixtureFile, function () {
		it('looks like ' + expectedFile, function (done) {
			test(fixture, expected, { }, done);
		});
	});
});
