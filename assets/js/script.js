(function ($) {
    $(document).ready(function() {
          ///////// **mobile size** /////////
          $('.menu-bar').click(function () {
            $(this).toggleClass("nav_btn");
            $('.main-nav').toggleClass('open-nav');
          });
      
          $('.close-nav').click(function () {
            $('.main-nav').removeClass('open-nav');
          });

        ///////// **main Slider** /////////
        var mainSlider = new Swiper('.main-slider .swiper-container', {
            loop: true,
            autoplay: true,
            slidesPerView: 1,
            preloadImages: false,
            updateOnWindowResize: true,
            speed: 1000,
            
            // If we need pagination
            pagination: {
                el: '.main-slider .swiper-pagination',
                clickable: true,
            },
            // Navigation arrows   
            navigation: {
                nextEl: '.main-slider .swiper-button-next',
                prevEl: '.main-slider .swiper-button-prev',
            },
            on: {
                init: function (swiper) {
                    lazyLoad();
                },
                },
        });

        ///////// ** Services Slider** /////////
        var services = new Swiper('.services-row .swiper-container', {
            loop: true,
            autoplay: {
                    delay: 2000,
                },
            speed: 1000,
            updateOnWindowResize: true,
            observer: true,
            observeParents: true,
            pagination: {
                el: '.services-row .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.services-row .swiper-button-next',
                prevEl: '.services-row .swiper-button-prev',
            },
            breakpoints: {
                0: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                767: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                },
                992: {
                    slidesPerView: 4,
                    spaceBetween: 15,
                },
                1199: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
            },
            on: {
                init: function (swiper) {
                lazyLoad();
                },
            },
        });

        ///////// ** Customer Opinions Slider** /////////
        var testmonials = new Swiper('.testmonials-row .swiper-container', {
            loop: true,
            autoplay: {
                    delay: 2000,
                },
            speed: 1000,
            updateOnWindowResize: true,
            pagination: {
                el: '.testmonials-row .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.testmonials-row .swiper-button-next',
                prevEl: '.testmonials-row .swiper-button-prev',
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                767: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                },
                1199: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
            },
            on: {
                init: function (swiper) {
                lazyLoad();
                },
            },
        });
        
        ///////// ** Our Clients Slider** /////////
        var newOpinions = new Swiper('.clients-row .swiper-container', {
            loop: true,
            autoplay: {
                    delay: 2000,
                },
            speed: 500,
            updateOnWindowResize: true,
            pagination: {
                el: '.clients-row .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.clients-row .swiper-button-next',
                prevEl: '.clients-row .swiper-button-prev',
            },
            breakpoints: {
                0: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                767: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
                992: {
                    slidesPerView: 4,
                    spaceBetween: 15,
                },
                1199: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                },
            },
            on: {
                init: function (swiper) {
                lazyLoad();
                },
            },
            });


        // lazy load
        lazyLoad();
    });

    /*************************statistics *******************/
    $(window).scroll(staticsScroll);

    var viewed = false;
    
    function isScrolledIntoView(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
    
        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();
    
        return elemBottom <= docViewBottom && elemTop >= docViewTop;
    }
    
    function staticsScroll() {
        if (isScrolledIntoView($(".stat-num")) && !viewed) {
            viewed = true;
            $(".stat-num").each(function() {
                var $this = $(this),
                    countTo = $this.attr("data-count");
                $({ countNum: $this.text() }).animate(
                    {
                        countNum: countTo
                    },
                    {
                        duration: 3000,
                        easing: "swing",
                        step: function() {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function() {
                            $this.text(this.countNum);
                        }
                    }
                );
            });
        }
    }

    /**********lazy load ***********/
    function lazyLoad() {
        const images = document.querySelectorAll(".lazy-img");
    
        const optionsLazyLoad = {
            //  rootMargin: '-50px',
            // threshold: 1
        };
    
        const imageObserver = new IntersectionObserver(function (enteries) {
            enteries.forEach(function (entery) {
            if (!entery.isIntersecting) {
                return;
            } else {
                preloadImage(entery.target);
                imageObserver.unobserve(entery.target);
            }
            });
        }, optionsLazyLoad);
        
        images.forEach(function (image) {
            imageObserver.observe(image);
        });
        }
        
        function preloadImage(img) {
        img.src = img.getAttribute("data-src");
        img.onload = function () {
            img.parentElement.classList.remove("loading-img");
            img.parentElement.classList.add("loaded-img");
            // img.parentElement.parentElement.classList.add("lazy-head-img");
        };
        }
})(jQuery)