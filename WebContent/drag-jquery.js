(function (document) {
            //Usage: $("#id").drag()  
            //Author: hooyes
            $.fn.Drag = function () {
                var M = false;
                var Rx, Ry;
                var t = $(this);//
            t.mousedown(function (event) {
                    Rx = event.pageX - (parseInt(t.css("left")) || 0);
                    Ry = event.pageY - (parseInt(t.css("top")) || 0);
                    t.css("position", "absolute").css('cursor', 'move').fadeTo(20, 0.5);//animate
                    M = true;
                })
            .mouseup(function (event) {
                M = false; t.fadeTo(20, 1);
            });
                $(document).mousemove(function (event) {
                    if (M) {
                        t.css({ top: event.pageY - Ry, left: event.pageX - Rx });
                    }
                });
            }
})(document);

$(document).ready(function () {
	
    $("#windowDemo").Drag();
    
    $("#friends-panel").Drag();

});
