import {Component, AfterViewInit} from "@angular/core";
import {Message} from "primeng/primeng";
import {Router, NavigationEnd} from "@angular/router";


declare var $: any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.css'
  ]
})
export class HomeComponent implements AfterViewInit {


  constructor(router:Router) {

    // Alla fine di ogni navigazione scrollo al top
    router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          console.log("SCROLL TOP!");
          $('body').scrollTop(0);
        }
      });
  }

  ngAfterViewInit() {

    //BEGIN BACK TO TOP
    $(window).scroll(function(){
      if ($(this).scrollTop() < 200) {
        $('#totop') .fadeOut();
      } else {
        $('#totop') .fadeIn();
      }
    });
    $('#totop').on('click', function(){
      $('html, body').animate({scrollTop:0}, 'fast');
      return false;
    });
    //END BACK TO TOP

    var flag;
    if($('body').hasClass('sidebar-colors')){
      flag = true;
    } else{
      flag = false;
    }
    $('#menu-toggle').toggle(
      function() {

        if($('#wrapper').hasClass('right-sidebar')) {
          $('body').addClass('right-side-collapsed')
          $('#sidebar .slimScrollDiv').css('overflow', 'initial');
          $('#sidebar .menu-scroll').css('overflow', 'initial');
        } else{
          $('body').addClass('left-side-collapsed').removeClass('sidebar-colors');
          $('#sidebar .slimScrollDiv').css('overflow', 'initial');
          $('#sidebar .menu-scroll').css('overflow', 'initial');
        }
      }, function() {
        if($('#wrapper').hasClass('right-sidebar')) {
          $('body').removeClass('right-side-collapsed');
          $('#sidebar .slimScrollDiv').css('overflow', 'hidden');
          $('#sidebar .menu-scroll').css('overflow', 'hidden');
        } else{
          $('body').removeClass('left-side-collapsed')
          if(flag == true){
            $('body').addClass('sidebar-colors');
          }
          $('#sidebar .slimScrollDiv').css('overflow', 'hidden');
          $('#sidebar .menu-scroll').css('overflow', 'hidden');
        }
      }
    );

    if($('#wrapper').hasClass('right-sidebar')) {
      $('ul#side-menu li').hover(function () {
        if ($('body').hasClass('right-side-collapsed')) {
          $(this).addClass('nav-hover');
        }
      }, function () {
        if ($('body').hasClass('right-side-collapsed')) {
          $(this).removeClass('nav-hover');
        }
      });
    } else{
      $('ul#side-menu li').hover(function () {
        if ($('body').hasClass('left-side-collapsed')) {
          $(this).addClass('nav-hover');
        }
      }, function () {
        if ($('body').hasClass('left-side-collapsed')) {
          $(this).removeClass('nav-hover');
        }
      });
    }

    $('[data-hover="dropdown"]').dropdownHover();

    // BEGIN FORM CHAT
    $('.btn-chat').click(function () {
      if($('#chat-box').is(':visible')){
        $('#chat-form').toggle('slide', {
          direction: 'right'
        }, 500);
        $('#chat-box').hide();
      } else{
        $('#chat-form').toggle('slide', {
          direction: 'right'
        }, 500);
      }
    });
    $('.chat-box-close').click(function(){
      $('#chat-box').hide();
      $('#chat-form .chat-group a').removeClass('active');
    });
    $('.chat-form-close').click(function(){
      $('#chat-form').toggle('slide', {
        direction: 'right'
      }, 500);
      $('#chat-box').hide();
    });

    $('#chat-form .chat-group a').unbind('*').click(function(){
      $('#chat-box').hide();
      $('#chat-form .chat-group a').removeClass('active');
      $(this).addClass('active');
      var strUserName = $('> small', this).text();
      $('.display-name', '#chat-box').html(strUserName);
      var userStatus = $(this).find('span.user-status').attr('class');
      $('#chat-box > .chat-box-header > span.user-status').removeClass().addClass(userStatus);
      var chatBoxStatus = $('span.user-status', '#chat-box');
      var chatBoxStatusShow = $('#chat-box > .chat-box-header > small');
      if(chatBoxStatus.hasClass('is-online')){
        chatBoxStatusShow.html('Online');
      } else if(chatBoxStatus.hasClass('is-offline')){
        chatBoxStatusShow.html('Offline');
      } else if(chatBoxStatus.hasClass('is-busy')){
        chatBoxStatusShow.html('Busy');
      } else if(chatBoxStatus.hasClass('is-idle')){
        chatBoxStatusShow.html('Idle');
      }


      var offset = $(this).offset();
      var h_main = $('#chat-form').height();
      var h_title = $("#chat-box > .chat-box-header").height();
      var top = ($('#chat-box').is(':visible') ? (offset.top - h_title - 40) : (offset.top + h_title - 20));

      if((top + $('#chat-box').height()) > h_main){
        top = h_main - 	$('#chat-box').height();
      }

      $('#chat-box').css({'top': top});

      if(!$('#chat-box').is(':visible')){
        $('#chat-box').toggle('slide',{
          direction: 'right'
        }, 500);
      }
      // FOCUS INPUT TExT WHEN CLICK
      $('ul.chat-box-body').scrollTop(500);
      $("#chat-box .chat-textarea input").focus();
    });
    // Add content to form
    $('.chat-textarea input').on("keypress", function(e){

      var $obj = $(this);
      var $me = $obj.parent().parent().find('ul.chat-box-body');
      var $my_avt = 'https://s3.amazonaws.com/uifaces/faces/twitter/kolage/128.jpg';
      var $your_avt = 'https://s3.amazonaws.com/uifaces/faces/twitter/alagoon/48.jpg';
      if (e.which == 13) {
        var $content = $obj.val();

        if ($content !== "") {
          var d = new Date();
          var h = d.getHours();
          var m = d.getMinutes();
          if (m < 10) m = 0 + m;
          $obj.val(""); // CLEAR TEXT ON TEXTAREA

          var $element = "";
          $element += "<li>";
          $element += "<p>";
          $element += "<img class='avt' src='"+$my_avt+"'>";
          $element += "<span class='user'>John Doe</span>";
          $element += "<span class='time'>" + h + ":" + m + "</span>";
          $element += "</p>";
          $element = $element + "<p>" + $content +  "</p>";
          $element += "</li>";

          $me.append($element);
          var height = 0;
          $me.find('li').each(function(i, value){
            height += parseInt($(this).height());
          });

          height += 0;
          //alert(height);
          $me.scrollTop(height);  // add more 400px for #chat-box position

          // RANDOM RESPOND CHAT

          var $res = "";
          $res += "<li class='odd'>";
          $res += "<p>";
          $res += "<img class='avt' src='"+$your_avt+"'>";
          $res += "<span class='user'>Swlabs</span>";
          $res += "<span class='time'>" + h + ":" + m + "</span>";
          $res += "</p>";
          $res = $res + "<p>" + "Yep! It's so funny :)" + "</p>";
          $res += "</li>";
          setTimeout(function(){
            $me.append($res);
            $me.scrollTop(height+100); // add more 500px for #chat-box position
          }, 1000);
        }
      }
    });
    // END FORM CHAT


    //BEGIN CHAT FORM
    $('.chat-scroller').slimScroll({
      "width": '100%',
      "height": '270px',
      "wheelStep": 5,
      "scrollTo": "100px"
    });
    $('.chat-form input#input-chat').on("keypress", function(e){

      var $obj = $(this);
      var $me = $obj.parents('.portlet-body').find('ul.chats');

      if (e.which == 13) {
        var content = $obj.val();

        if (content !== "") {
          $me.addClass(content);
          var d = new Date();
          var h = d.getHours();
          var m = d.getMinutes();
          if (m < 10) m = 0 + m;
          $obj.val(""); // CLEAR TEXT ON TEXTAREA

          var element = "";
          element += "<li class='in'>";
          element += "<img src='app/images/avatar/roccosavella_48.jpg' class='avatar img-responsive' />";
          element += "<div class='message'>";
          element += "<span class='chat-arrow'></span>";
          element += "<a class='chat-name' href='#'>IO: &nbsp;</a>";
          element += "<span class='chat-datetime'>at July 6, 2014" + h + ":" + m + "</span>";
          element += "<span class='chat-body'>" + content + "</span>";
          element += "</div>";
          element += "</li>";

          $me.append(element);
          var height = 0;
          $me.find('li').each(function(i, value){
            height += parseInt($(this).height());
          });

          height += 0;
          //alert(height);
          $('.chat-scroller').slimScroll({
            scrollTo: height
          });
        }
      }
    });
    $('.chat-form span#btn-chat').on("click", function(e){

      e.preventDefault();
      var $obj = $(this).parents('.chat-form').find('input#input-chat');
      var $me = $obj.parents('.portlet-body').find('ul.chats');
      var content = $obj.val();

      if (content !== "") {
        $me.addClass(content);
        var d = new Date();
        var h = d.getHours();
        var m = d.getMinutes();
        if (m < 10) m = 0 + m;
        $obj.val(""); // CLEAR TEXT ON TEXTAREA

        var element = "";
        element += "<li class='in'>";
        element += "<img [src]='avatarImage48' class='avatar img-responsive' />";
        element += "<div class='message'>";
        element += "<span class='chat-arrow'></span>";
        element += "<a class='chat-name' href='#'>Admin &nbsp;</a>";
        element += "<span class='chat-datetime'>at July 6, 2014" + h + ":" + m + "</span>";
        element += "<span class='chat-body'>" + content + "</span>";
        element += "</div>";
        element += "</li>";

        $me.append(element);
        var height = 0;
        $me.find('li').each(function(i, value){
          height += parseInt($(this).height());
        });
        height += 0;

        $('.chat-scroller').slimScroll({
          scrollTo: height
        });
      }

    });
    //END CHAT FORM

  }

  display: boolean = false;
  msgs: Message[] = [];

  showDialog() {
    this.display = true;
  }

  hideDialog() {
    this.display = false;
  }

  showGrowlMessage(event:CustomEvent){
    this.msgs = event.detail;
  }


}
