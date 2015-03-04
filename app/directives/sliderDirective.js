(function() {
    'use strict';

    angular.module('slider.directive', [])
        .directive('sliderDirective', ['$window', function($window) {
            return {
                restrict: 'A',
                templateUrl: '/app/templates/directives/sliderTemplate.html',
                scope: {
                    slides: '=*'
                },
                controller: function($scope, $element, $attrs) {

                    $scope.slider = {
                        slides: function slides() {
                            return $scope.slides;
                        },
                        activeSlides: function activeSlides() {
                            return this.slides().filter(function(slide, index) {
                                if(slide.active) {
                                    return slide
                                }
                            })
                        },
                        toggleActive: function toggleActive(array) {
                            if(!array) {
                                var array = this.activeSlides();
                            }

                            array.forEach(function(slide) {
                                slide.active = !slide.active;
                            });

                            return array;
                        },
                        next: function next() {
                            // We're animating now! (used to block button
                            // clicks)
                            this.animating.status = true;

                            // index 0 to false and index 3 to true
                            this.toggleActive([this.slides()[0], this.slides()[3]]);

                            // Modify DOM after animation has completed
                            $window.setTimeout(function(slides, toggleActive, animating) {
                                // Move first slide to back
                                slides().push(slides().shift());

                                // Set next slide in viewport as active
                                //toggleActive([slides()[2]]);

                                // Tell angular about the change
                                animating.status = false;
                                $scope.$apply();
                            }, 1000, this.slides, this.toggleActive, this.animating);
                        },
                        prev: function prev() {
                            // We're animating now! (used to block button
                            // clicks)
                            this.animating.status = true;

                            // Toggle active on last active slide
                            this.toggleActive([this.slides()[2]]);

                            // Move new slide to front
                            this.slides().unshift(this.slides().pop());

                            // Next frame start animating...
                            //
                            // This is because you seemingly can't insert into
                            // the DOM and start animating in the same frame.
                            $window.setTimeout(function(slides, toggleActive, animating) {
                                toggleActive([slides()[0]]);

                                $scope.$apply();
                            }, 0, this.slides, this.toggleActive, this.animating);

                            // Finish animation
                            $window.setTimeout(function(slides, toggleActive, animating) {
                                animating.status = false;
                                $scope.$apply();
                            }, 1000, this.slides, this.toggleActive, this.animating);
                        },
                        animating: {
                           // Has to be an object because we want changes to
                           // status to allways modify this reference
                           status: false
                        },
                        disabled: false
                    };

                },
                link: function(scope, element, attrs) {
                    // Need 4 slides to make animations work
                    if(scope.slides.length == 3) {
                        scope.slides[3] = angular.extend({}, scope.slides[1]);
                    }

                    // Make first three slides display in the viewport by
                    // setting 'active' boolean
                    scope.slides.some(function(slide, index) {
                        if(index > 2) {
                            return true
                        }

                        slide.active = true;
                    });

                    // Only 1 or 2 slides?
                    if(scope.slides.length < 3) {
                        // Show all slides in viewport
                        scope.slides.forEach(function(slide) {
                            slide.active = true;
                        })

                        // Disable slider
                        scope.slider.disabled = true;
                    }

                }
            }
        }]);
})();
