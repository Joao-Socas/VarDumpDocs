var navloaded = false;
var mainloaded = false;
var homeposition = 0;
var settingupposition;
var examplesposition;
var commingsoonposition;
var contactposition;
loadedCheck = window.setInterval(CheckLoaded,200);

function FinishedLoading()
{
		$('.pop').on('click', function() {
			$('.imagepreview').attr('src', $(this).find('img').attr('src'));
			$('#imagemodal').modal('show');   
		});
    ScrollSpySet();
    $('main').scroll(ScrollSpy);
    $(".accordion-button").click(function(){
      setTimeout(ScrollSpySet, 600);
    });

    $("#btn-report").click(function(){
      SetContact(true);
    });
    $("#btn-contact").click(function(){
      SetContact(false);
    });

    $("#btn-nav").click(function(){
      $("nav").animate({left:'0%'}, 300, 'swing');
    });

    $("main").click(function(){
      if ($("nav").css("position") == "fixed") {
        $("nav").animate({left:'-100%'}, 300, 'swing');
      }
    });

    $(window).resize(function(){
      $("nav").removeAttr('style');
      ScrollSpySet;
    });
}

function CheckLoaded()
{
  if (navloaded && mainloaded) {
    FinishedLoading();
    clearInterval(loadedCheck);
    $.ajax({
      url:"https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js",
      dataType: 'script',
      async: true
    });

    $.ajax({
      url:"https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js",
      dataType: 'script',
      data:{
        lang: "css",
        skin: "sunburst"
      },
      async: true
    });
    $.ajax({
      url:"https://www.google.com/recaptcha/api.js",
      dataType: 'script',
      async: true
    });    
  }
}

const getOffsetTop = element => {
  let offsetTop = 0;
  while(element) {
    offsetTop += element.offsetTop;
    element = element.offsetParent;
  }
  return offsetTop;
}

function SubmitContact() {
  
  if($("#contactform")[0].checkValidity())
  {
    $.ajax({
      dataType: 'json',
      data: {
        replyto : $("#replyto").val(),
        message : $("#messagebody").val()
      },
      url:"https://formspree.io/f/xdoybkko",
      method: "POST"
    });
  }
  else
  {
    $("#contactform")[0].reportValidity();
  }
}

function ScrollSpySet()
{
  settingupposition = getOffsetTop(document.getElementById('settingup'));
  examplesposition = getOffsetTop(document.getElementById('examples'));
  comingsoonposition = getOffsetTop(document.getElementById('comingsoon'));
  contactposition = getOffsetTop(document.getElementById('contact'));
  ScrollSpy();
  SetNavLinks();
}

function ScrollSpy()
{
  var scrolloffset = $("main").scrollTop();
  var offset = 400;

  if (scrolloffset < settingupposition - offset) 
  {
    $("#sidebar a").removeClass("active");
    $("#homelink").addClass("active");
  }
  if (scrolloffset > settingupposition - offset && scrolloffset < examplesposition - offset) 
  {
    $("#sidebar a").removeClass("active");
    $("#settinguplink").addClass("active");
  }
  if (scrolloffset > examplesposition - offset && scrolloffset < comingsoonposition - offset) 
  {
    $("#sidebar a").removeClass("active");
    $("#exampleslink").addClass("active");
  }
  if (scrolloffset > comingsoonposition - offset && scrolloffset < contactposition - offset) 
  {
    $("#sidebar a").removeClass("active");
    $("#comingsoonlink").addClass("active");
  }
  if (scrolloffset > contactposition - offset) 
  {
    $("#sidebar a").removeClass("active");
    $("#contactlink").addClass("active");
  }
}

function SetNavLinks()
{
  $("#homelink").off("click");
  $("#settinguplink").off("click");
  $("#exampleslink").off("click");
  $("#comingsoonlink").off("click");
  $("#contactlink").off("click");

  $("#homelink").click(function(event){
    event.preventDefault();
    $("main").stop().animate({scrollTop:homeposition}, 500, 'swing');
  });
  
  $("#settinguplink").click(function(event){
    event.preventDefault();
    $("main").stop().animate({scrollTop:settingupposition}, 500, 'swing');
  });
  
  $("#exampleslink").click(function(event){
    event.preventDefault();
    $("main").stop().animate({scrollTop:examplesposition}, 500, 'swing');
  });
  
  $("#comingsoonlink").click(function(event){
    event.preventDefault();
    $("main").stop().animate({scrollTop:comingsoonposition}, 500, 'swing');
  });
  
  $("#contactlink").click(function(event){
    event.preventDefault();
    $("main").stop().animate({scrollTop:contactposition}, 500, 'swing');
    SetContact(true);
  });

  $("#dropdow-contact").click(function(event){
    event.preventDefault();
    $("main").stop().animate({scrollTop:contactposition}, 500, 'swing');
    SetContact(false);
  });
}

function SetContact(isbug)
{
  if (isbug) 
  {
    bootstrap.Carousel.getOrCreateInstance(document.getElementById('contactbug')).to(0);
    $("#btn-contact").removeClass("active");
    $("#btn-report").addClass("active");
  }
  else
  {
    bootstrap.Carousel.getOrCreateInstance(document.getElementById('contactbug')).to(1);
    $("#btn-report").removeClass("active");
    $("#btn-contact").addClass("active");
  }
}

$( document ).ready(function() 
{
  $("nav").load("nav.html", function(){
    navloaded = true;
  });
  
  $("main").load("main.html", function()
  {
    $("#home").load("home.html", function(){
      $("#settingup").load("settingup.html", function(){
        $("#examples").load("examples.html", function(){
          $("#comingsoon").load("comingsoon.html", function(){
            $("#contact").load("contact.html", function(){
              mainloaded = true;
            });
          });
        });
      });
    });
  });
});

