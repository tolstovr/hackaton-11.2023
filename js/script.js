//scrollspy
$(document).ready(function() {
    var $menu = $(".navbar ul");
    var $menu_a = $(".nav-link", $menu);
    var id = false;
    var sections = [];
    var hash = function(hash) {
        if (history.pushState) {
            history.pushState(null, null, hash);
        } else {
            location.hash = h;
        }
    }
    $menu_a.click(function(event) {
        event.preventDefault();
        $("html, body").animate(
            {
            scrollTop: $($(this).attr("href")).offset().top
            },
            {
            duration: 0,
            complete: hash($(this).attr("href"))
            }
        );
    });
    $menu_a.each(function() {
        sections.push($($(this).attr("href")));
    });
    $(window).scroll(function(event) {
        var scrolling = $(this).scrollTop() + $(this).height() / 3;
        var scroll_id;
        for (var i in sections) {
            var section = sections[i];
            if (scrolling > section.offset().top) {
                scroll_id = section.attr("id");
            }
        }
        if (scroll_id !== id) {
            id = scroll_id;
            $menu_a.removeClass("active");
            $("a[href='#"+id+"']", $menu).addClass("active");
        }
    });
});

//scroll animation
function element_visible(entry) {
    entry.forEach(change => {
        if (change.isIntersecting) {
            change.target.classList.add('element-shown');            
        };
    });
};

let options = {threshold: [0.15]};
let observer = new IntersectionObserver(element_visible, options);
let elements = $(".fade-right, .scale");

for (let elm of elements) {
    observer.observe(elm);
};

const $header = $("aside");
let prevScroll;
let lastShowPos;

$(window).on("scroll", function() {
    const scrolled = $(window).scrollTop();

    if (scrolled > 100 && scrolled > prevScroll) {
        $header.addClass("aside-out");
        lastShowPos = scrolled;
    } else if (scrolled <= Math.max(lastShowPos - 100, 0)) {
        $header.removeClass("aside-out");
    }
    prevScroll = scrolled;
})