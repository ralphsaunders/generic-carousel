describe('generic carousel', function() {
    var elm,
        scope,
        compile;

    beforeEach(module('templates'));
    beforeEach(module('slider.directive'));

    beforeEach(inject(function($rootScope, $compile) {
        elm = angular.element(
            '<div data-slider-directive data-slides="slides">' +
                '<img src="http://placehold.it" alt="index-me" />' +
            '</div>');

        scope = $rootScope;
        compile = $compile;
    }));

    it('has the slide that was passed in', function() {
        scope.slides = [
            {
                url: 'http://placehold.it/200x200',
                caption: 'beep boop'
            }
        ];
        compile(elm)(scope);
        scope.$digest();

        expect(elm.html()).toContain('200x200');
    });

    it('removes inlined images that were included for search engine indexes', function() {
        scope.slides = [
            {
                url: 'http://placehold.it/200x200',
                caption: 'beep boop'
            }
        ];
        compile(elm)(scope);
        scope.$digest();

        expect(elm.html()).not.toContain('index-me');
    });

    it('disables iteself when only 1 or 2 slides are passed in', function() {
        scope.slides = [
            {
                url: 'http://placehold.it/200x200',
                caption: 'beep boop'
            },
            {
                url: 'http://placehold.it/300x300',
                caption: 'beep boop: second slide'
            }
        ];
        compile(elm)(scope);
        scope.$digest();

        expect(elm[0].querySelector('.disabled')).not.toBeNull();
    });

    it('duplicates a slide if only 3 slides are passed in', function() {
        scope.slides = [
            {
                url: 'http://placehold.it/300x300',
                caption: '0'
            },
            {
                url: 'http://placehold.it/300x300',
                caption: '1'
            },
            {
                url: 'http://placehold.it/300x300',
                caption: '2'
            }
        ];
        compile(elm)(scope);
        scope.$digest();

        expect(elm[0].querySelectorAll('.slide').length).toBe(4);
    });

});
