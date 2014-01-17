(function($){
    window.styleButtons = function(context){
        context = context || document
        // Put custom styles on the radio buttons and  check boxes
        $(context).find("input:radio").addClass("hideradiobutton");
        $(context).find("input:radio").wrap('<span class="radiobutton"></span>');
        $(context).find("input:radio:checked").parent().removeClass("radiobutton");
        $(context).find("input:radio:checked").parent().addClass("radiobutton_on");

        $(context).on('click', 'input:radio', function(event) {

            $('input:radio[name="' + $(this).attr("name") + '"]').parent().removeClass();
            $('input:radio[name="' + $(this).attr("name") + '"]').not(":checked").parent().addClass("radiobutton")
            $('input:radio[name="' + $(this).attr("name") + '"]:checked').parent().addClass("radiobutton_on")
        });

        $(context).find("input:checkbox").addClass("hidecheckbox");
        $(context).find("input:checkbox").wrap('<span class="checkboxbutton"></span>');
        $(context).find("input:checkbox:checked").parent().removeClass("checkboxbutton");
        $(context).find("input:checkbox:checked").parent().addClass("checkboxbutton_on");

        $(context).on('click', "input:checkbox", function(event) {
            $(this).parent().removeClass();
            $(this).not(":checked").parent().addClass("checkboxbutton")
            $(this).filter(':checked').parent().addClass("checkboxbutton_on")
        });
    }
})(jQuery);
