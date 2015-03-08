describe('generic carousel', function() {
    var elm,
        scope,
        timeout,
        compile;

    beforeEach(module('templates'));
    beforeEach(module('slider.directive'));

    beforeEach(inject(function($rootScope, $compile, $timeout) {
        elm = angular.element(
            '<div data-slider-directive data-slides="slides">' +
                '<img src="http://placehold.it" alt="index-me" />' +
            '</div>');

        scope = $rootScope;
        compile = $compile;
        timeout = $timeout;
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
                url: 'http://placehold.it/300x300'
            },
            {
                url: 'http://placehold.it/300x300'
            },
            {
                url: 'http://placehold.it/300x300'
            }
        ];
        compile(elm)(scope);
        scope.$digest();

        expect(elm[0].querySelectorAll('.slide').length).toBe(4);
    });

    it('sets first 3 slides to active', function() {
        scope.slides = [
            {
                url: 'http://placehold.it/1x1'
            },
            {
                url: 'http://placehold.it/2x2'
            },
            {
                url: 'http://placehold.it/3x3'
            },
            {
                url: 'http://placehold.it/4x4'
            }
        ];
        compile(elm)(scope);
        scope.$digest();

        var first3Slides = [].filter.call(elm[0].querySelectorAll('.slide'), function(slide, index) {
            if(index <  3) {
                return slide;
            }
        });

        var activeSlides = first3Slides.filter(function(slide) {
            if(slide.classList.contains('active')) {
                return slide;
            }
        });

        expect(activeSlides.length).toBe(3);
    });

    it('next makes next slide active', function() {
        scope.slides = [
            {
                url: 'http://placehold.it/1x1'
            },
            {
                url: 'http://placehold.it/2x2'
            },
            {
                url: 'http://placehold.it/3x3'
            },
            {
                url: 'http://placehold.it/4x4'
            }
        ];
        compile(elm)(scope);
        scope.$digest();

        elm[0].querySelector('.next').click();

        expect(elm[0].querySelectorAll('.slide')[3].classList.contains('active')).toBe(true);
        expect(elm[0].querySelectorAll('.slide')[0].classList.contains('active')).toBe(false);
    });

    it('prev makes prev slide active', function() {
        scope.slides = [
            {
                url: 'http://placehold.it/1x1'
            },
            {
                url: 'http://placehold.it/2x2'
            },
            {
                url: 'http://placehold.it/3x3'
            },
            {
                url: 'http://placehold.it/4x4'
            }
        ];
        compile(elm)(scope);
        scope.$digest();

        elm[0].querySelector('.prev').click();

        timeout.flush();

        expect(elm[0].querySelectorAll('.slide')[0].classList.contains('active')).toBe(true);
        expect(elm[0].querySelectorAll('.slide')[0].innerHTML).toContain('4x4');
    });


});
