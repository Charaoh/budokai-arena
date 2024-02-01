document.getElementById('playnow').addEventListener('mouseover', function() {
    // This function will be triggered when the mouse hovers over the banner.
    // You can expand this with more complex JavaScript animations or effects.
});

document.getElementById('playnow').addEventListener('mouseout', function() {
    // This function will be triggered when the mouse leaves the banner.
    // Reset any changes made during the hover effect.
});


jQuery(function ($) {
    // Dropdown menu
    $('.sidebar-dropdown > a').click(function () {
        $('.sidebar-submenu').slideUp(200);
        if ($(this).parent().hasClass('active')) {
            $('.sidebar-dropdown').removeClass('active');
            $(this).parent().removeClass('active');
        } else {
            $('.sidebar-dropdown').removeClass('active');
            $(this).next('.sidebar-submenu').slideDown(200);
            $(this).parent().addClass('active');
        }
    });

    //toggle sidebar
    $('#toggle-sidebar').click(function () {
        $('.page-wrapper').toggleClass('toggled');
    });

    //close sidebar
    $("#close-sidebar").click(function () {
        $(".page-wrapper").removeClass("toggled");
    });
    $("#show-sidebar").click(function () {
        $(".page-wrapper").addClass("toggled");
    });

    // bind hover if pinned is initially enabled
    if ($('.page-wrapper').hasClass('pinned')) {
        $('#sidebar').hover(
            function () {
                console.log('mouseenter');
                $('.page-wrapper').addClass('sidebar-hovered');
            },
            function () {
                console.log('mouseout');
                $('.page-wrapper').removeClass('sidebar-hovered');
            }
        );
    }

    //pin sidebar
    $('#pin-sidebar').click(function () {
        if ($('.page-wrapper').hasClass('pinned')) {
            // unpin sidebar when hovered
            $('.page-wrapper').removeClass('pinned');
            $('#sidebar').unbind('hover');
        } else {
            $('.page-wrapper').addClass('pinned');
            $('#sidebar').hover(
                function () {
                    console.log('mouseenter');
                    $('.page-wrapper').addClass('sidebar-hovered');
                },
                function () {
                    console.log('mouseout');
                    $('.page-wrapper').removeClass('sidebar-hovered');
                }
            );
        }
    });

    //toggle sidebar overlay
    $('#overlay').click(function () {
        $('.page-wrapper').toggleClass('toggled');
    });

    //custom scroll bar is only used on desktop
    if (
        !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        )
    ) {
        $('.sidebar-content').mCustomScrollbar({
            axis: 'y',
            autoHideScrollbar: true,
            scrollInertia: 300,
        });
        $('.sidebar-content').addClass('desktop');
    }
    
});

