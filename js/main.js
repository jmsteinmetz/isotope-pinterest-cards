$(function() {

    // build all items and make all items fit pinterest style

    layout('config/layout.json', false);

});

function gridThis(selector) {
    //console.log("fired");
    $('.grid').isotope({
        itemSelector: selector,
        masonry: {
            columnWidth: 250,
            isFitWidth: true,
            gutter: 10
        }
    });
};

function layout(configuration, shuffle) {
    $.getJSON(configuration, function(obj) {

        $.each(obj.items, function(key, value) {

            var widthClass  = '';
            var heightClass = '';
            var template    = '';
            var measures    = '';

            if (value.display = true) {

                //console.log(value.item);
                if (value.width == 1) { widthClass = '' }
                if (value.width == 2) { widthClass = 'grid-item--width2' }
                if (value.height == 1) { heightClass = ' ' }
                if (value.height == 2) { heightClass = 'grid-item--height2' }

                var icon = "<span class='glyphicon glyphicon-check'></span>";

                    //console.log(this.detail)

                if (value.type === 'persona') {
                    
                    
                    var template = '<div id="' + value.item + '" class="persona">'
                        + '<div class="hero"></div>'
                        + '<h3>' + this.detail.name + '</h3>'
                        + '<span class="caption">' + this.detail.age + ', ' + this.detail.gender + '</span>'
                        + '</div>'
                        $(".grid").append("<div class='grid-item " + widthClass + " " + heightClass + " " + value.style + "'></div>");

                }

                if (value.type === 'measures') {
                    var template = '<div id="' + value.item + '" class="measures">'
                        + '<div class="hero"><ul class="measures"></ul></div>'
                        + '<h3>' + this.detail.date + '</h3>'
                        + '<span class="caption">' + this.detail.location + '</span>'
                        + '</div>';

                        $(".grid").append("<div class='grid-item " + widthClass + " " + heightClass + " " + value.style + "'>" + template + "</div>");

                        $.each(this.measures, function(k,v) {
                            console.log(v.measure);
                            var target = '#'+value.item;
                            $(target + " .measures").append('<li><div class="icon">' + icon + '</div></li>');

                        })

                }
                if (value.type === 'text') {
                    var template = '<span class="text">' + value.item + '</span>'
                    $(".grid").append("<div class='grid-item " + widthClass + " " + heightClass + " " + value.style + "'>" + template + "</div>");
                }
                

            }
        })

    }).done(function() {
        gridThis('.grid-item');
        if (shuffle == true) {
            //console.log("shuffled");
            $('.grid').isotope('shuffle');
        }
    });
}