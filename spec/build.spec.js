describe("HashChange", function(){

	// we're not interested in testing Google's code.
	// These tests are just to make sure it exports properly

	describe("Test framework, successful build etc", function(){

		it("can be required", function(){

			expect(require('hashchange')).toBeTruthy();

		});

	})



	describe("The Module", function(){

		var hashChange = require('hashchange');

		it("can set a callback, can be manually triggered", function(){

			var spy = jasmine.createSpy("HashChanged");

			hashChange.update(spy);

			hashChange.update();

			expect(spy).toHaveBeenCalled();

			hashChange.unbind(spy);

		});


		it("hash changes without a callback dont throw an error", function(){

			hashChange.update();

		});

		describe("hash changing", function(){

			var loc, spy, fragment = '';

			beforeEach(function(){

				loc = window.location.href.replace(window.location.hash, '');
				window.location.href = loc + "#";
				spy = function( frag ){

					fragment = frag;

				}
				hashChange.update(spy);

			});

			afterEach(function(){

				hashChange.unbind(spy);
				window.location.href = loc + "#";

			});

			it("fires the callback when the hash changes", function(){

				runs(function(){

					window.location.href = loc + "#jasmine-test";

				});

				waits(100);

				runs(function(){

					expect(fragment).toBe('jasmine-test');

				});

				waits(100);

				runs(function(){

					window.location.href = loc + "#second-hash";

				})

				waits(100);

				runs(function(){

					expect(fragment).toBe('second-hash');

				});
			


			})


		});

	})


})