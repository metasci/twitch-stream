
var chanTitles = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff", "OgamingSC2", "ESL_SC2", "comster404", "brunofin"];


var $all = $('#all');
var $online = $('#online');
var $offline = $('#offline');
var $list = $('.list');
var $button = $('.button');

$button.click(function() {
    var $this = $(this);
    if(!($this.hasClass('active'))){
        $button.removeClass('active');
        $this.addClass('active');
    }
});
$(function() {
    $.each(chanTitles, function(i, chanTitle){ 

    var game, state, status, logo, name, link;
        $.getJSON('https://api.twitch.tv/kraken/streams/'+chanTitle+'?callback=?', function(data) {

            if(data.stream === undefined) {
                game = 'Account Closed';
                state = 'off';
            }else if(data.stream === null) {
                game = 'Offline';
                state = 'off';
            }else {
                game = data.stream.game;
                state = 'on';
            }
            //console.log(data.stream.channel);
            $.getJSON('https://api.twitch.tv/kraken/channels/'+chanTitle+'?callback=?', function(data) {

                //console.log(data);
                status = data.status;
                //console.log(status); // additional current activity info
                logo = data.logo != null ? data.logo : 'http://img03.deviantart.net/728e/i/2008/195/d/9/riddler_wallpaper_by_darthkoolguy.jpg';
                //console.log(logo); // user photo
                name = data.display_name != null ? data.display_name : chanTitle;
                //console.log(name); //user name
                link = data.url;
                //window.open(link); //link to user page

                build(state, logo, name, game, status, link);
            });
        });
    });
});

function build(state, logo, name, game, status, link) {

        var dispNme = '<a target="_blank" href="'+link+'"class="name">'+name+'</a>'
        var img = '<img src="'+logo+'" alt="" height="50" width="50">';
        var gme = '<span title="'+status+'"class="game">'+game+'<span>';

        $list.append('<div class="li row '+ state +'">'+ img + dispNme + gme +'</div>');
}




$all.on('click',function() {
    //show all channels;
    $('.li').removeClass('hide');
});

$online.on('click', function(){
    //show only the channels that are currently online;
    if($('.on').hasClass('hide')){
        $('.on').removeClass('hide');
    }
    $('.off').addClass('hide');
});

$offline.on('click', function() {
    //show only the channels that are currently offline;
    if($('.off').hasClass('hide')){
        $('.off').removeClass('hide');
    }
    $('.on').addClass('hide');
});


