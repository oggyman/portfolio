import slide from './transitions/slide.js';

const { barba } = window;

/*
 * App Class
 */
class App {
    static start() {
        return new App();
    }

    constructor() {
        Promise
            .all([
                App.domReady(),
            ])
            .then(this.init.bind(this));
    }

    static domReady() {
        return new Promise(resolve => {
            document.addEventListener('DOMContentLoaded', resolve);
        });
    }

    static showPage() {
        document.documentElement.classList.add('ready');

    }

    static makePageCurrent(url) {

        console.log(url);
        //TODO: make regex to work
        // let name = str.match(/(?:[^/][\d\w\.]+)$((?:.html))/);
        console.log(name);
        // let result = str.match(/Java(Script)/);
        // (?:[^/][\d\w\.]+)$((?:.html))
    }

    init() {
        console.info('🚀App:init');
        //preventing pages from crashing when clicking same URL
        let links = document.querySelectorAll('a[href]');
        let cbk = function (e) {
            if (e.currentTarget.href === window.location.href) {
                e.preventDefault();
                e.stopPropagation();
            }
        };

        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener('click', cbk);
        }

        // Avoid "blank page" on JS error
        try {
            barba.hooks.before((e) => {
                // console.log("BEFORE EVENT", e);
                barba.wrapper.classList.add('is-animating');
                // console.log(window.location.href);

                if (window.location.href.indexOf("info") !== -1) {
                    $(".active").removeClass("active");
                    $("#info").addClass("active");
                    $("#projects").attr("data-direction", "next");
                    $("#contacts").attr("data-direction", "next");
                    // $(".info").addClass("parallax");
                } else if (window.location.href.indexOf("projects") !== -1) {
                    $(".active").removeClass("active");
                    $("#projects").addClass("active");
                    $("#info").attr("data-direction", "prev");
                    $("#contacts").attr("data-direction", "next");
                } else if (window.location.href.indexOf("contacts") !== -1) {
                    $(".active").removeClass("active");
                    $("#contacts").addClass("active");
                    $("#info").attr("data-direction", "prev");
                    $("#projects").attr("data-direction", "prev");
                } else {
                    console.log("home page")
                }

                if (e.next.namespace === "index") {
                    $("#small-menu").fadeOut();
                    $("#main-menu").fadeIn();
                } else {
                    $("#main-menu").fadeOut();
                    $("#small-menu").fadeIn(1400);
                }
            });

            barba.hooks.beforeEnter((e) => {
            });

            barba.hooks.after((e) => {
                barba.wrapper.classList.remove('is-animating');
                // $(".info").addClass("parallax");
                // console.log("AFTER EVENT", e);
                customScripts();
            });

            barba.init({
                debug: false,
                transitions: [
                    {
                        sync: true,
                        custom: ({ trigger }) => trigger.dataset && trigger.dataset.direction === 'next',
                        leave: ({ current }) => slide(current.container, 'leave', 'next'),
                        enter: ({ next }) => slide(next.container, 'enter', 'next'),
                    },
                    {
                        sync: true,
                        custom: ({ trigger }) => trigger.dataset && trigger.dataset.direction === 'prev',
                        leave: ({ current }) => slide(current.container, 'leave', 'prev'),
                        enter: ({ next }) => slide(next.container, 'enter', 'prev'),
                    },
                ],
            });
        } catch (err) {
            console.error(err);
        }

        App.showPage();



    }
}

App.start();


function customScripts() {
    jQuery.fn.fadeToggle = function (speed, easing, callback) {
        return this.animate({ opacity: 'toggle' }, speed, easing, callback);
    };
    console.clear();
    console.log("ready");



    $("#frontend-logo").click((e) => {
        console.log("e:", e);
        $("#frontend-logo").fadeToggle("slow", () => {
            $(".frontend-skills").fadeToggle("slow");
        });
    });
    $(".frontend-skills").click((e) => {
        console.log("e:", e);
        $(".frontend-skills").fadeToggle("slow", () => {
            $("#frontend-logo").fadeToggle("slow");
        });
    });

    $("#backend-logo").click((e) => {
        console.log("e:", e);
        $("#backend-logo").fadeToggle("slow", () => {
            $(".backend-skills").fadeToggle("slow");
        });
    });
    $(".backend-skills").click((e) => {
        console.log("e:", e);
        $(".backend-skills").fadeToggle("slow", () => {
            $("#backend-logo").fadeToggle("slow");
        });
    });

    $(".chuck").hover((e)=> {
        $(".chuck").toggle();
    })

    setInterval(function(){
        $.get("https://api.chucknorris.io/jokes/random", function(res){
            console.log("Chuck Joke: ", res.value);
            $(".chuck").append(res.value);
        })

    }, 10000)


}