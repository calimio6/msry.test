$(document).on('ready', function(){
  //se crea una variable que determina el status de masonry, basado en una cookie que por defecto sera "true", cuando se pulse el boton de cambio de grid, su estatus pasara aser "false" y segun eso eliminaria o no la clase ".msry" cambiando las dimensiones del item
  function readkie(kie){
    var nameEQ = kie + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++){
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if(c.indexOf(nameEQ)==0){
        return decodeURIComponent(c.substring(nameEQ.length,c.length));
      }
    }
    return null;
  }

  //inicia apertura masonry
  var $container = $('.masonry').imagesLoaded( function() {
    if (readkie('kie_msry_active') == '0') {
      $('#c2-option-bar-layout').css({'background': 'url(css/icon1b.png)no-repeat'})
      $('#c2-content').removeClass('masonry').addClass('layout')
      $('.shot').removeClass('msry')
      $('#c2-content').animate({
        opacity : [ 1, 'linear' ]},
        100
      );
    }
    else{
      // init
      $container.masonry({
        // options
        itemSelector: '.msry',
        columnWidth: 220,
        gutter: 15
      })
      $('#c2-content').animate({opacity : [ 1, 'linear' ]}, 100);
    };
  });
  //termina apertura masonry

  //inicia endless scroll + masonry o sin masonry
  $(window).scroll(function(){
    if($(window).scrollTop() + $(window).height() == $('body').height()){
      if (readkie('kie_msry_active') == '0'){
        //se obtienen los elementos nuevos para el "one column layout"
        $.get('/resources/datos.html', function(data){
          //se revisa el contenido
          var $filter = $(data).find('.shot').css({'opacity':'0'})
          //se agregan los nuevos elementos al "one column layout"
          var $newItems = $filter.imagesLoaded( function(){
            //mediante php y la coockie msry_active se usara la clase ".layout" en el contenedor "#c2-content" en vez de masonry, evitando asi la inicializacion del plugin.
            $('.layout').append($newItems),
            $('.shot').removeClass('msry').animate({opacity : [ 1, 'linear' ]}, 200)
          });
        })
      }
      else{
        //se obtienen los elementos nuevos para el "masonry grid layout"
        $.get('/resources/datos.html', function(data){
          //se revisa el contenido
          var $filter = $(data).find('.shot');
          //se agregan los nuevos elementos al "masonry grid layout"
          var $newItems = $filter.imagesLoaded( function(){
            $('.masonry').append($newItems).masonry('appended', $newItems)
          });
        })
      };  
    }
  })
  //termina endless scroll + masonry o sin masonry

  //inicia apertura popup post
  $('.post_click').click(function(event){
    event.preventDefault();
    var $href = $(this).attr('href');
    $('html').css({'overflow':'hidden'});
    $('body').css({'padding-right':'17px'});
    $('#c0').css({'display':'block'}).animate({opacity : [ 1, 'linear' ]}, 200)
    //se obtienen los elementos nuevos
    $.get($href, function(data){
      //se revisa el contenido
      var $filter = $(data).find('.post').css({'opacity':'0'})
      //se agregan los nuevos elementos
      var $newShot = $filter.imagesLoaded( function(){
        $('#c0').append($newShot),
        //se reajustan los estilos
        $('#post').css({'margin':'30px auto 15px auto'}).animate({opacity : [ 1, 'linear' ]}, 200)
        $('.post').css({'-webkit-box-shadow':'-5px 5px 20px #555','-moz-box-shadow':'-5px 5px 20px #555','box-shadow':'-5px 5px 20px #555'})
      });
    });
  });
  //termina apertura popup post

  //inicia cierre popup shot
  $('#c0-close').on('click', function(){
    $('#c0 .shot').remove(),
    $('html').css({'overflow':'auto'}),
    $('body').css({'padding-right':'0'});
    $('#c0').css({'display':'none','opacity':'0'})
  });
  //termina cierre popup shot

  //inicia apertura popup usuario
  $('.user_click').click(function(event){
    //cambiar por hover event
  });
  //termina apertura popup usuario
  
  //inicia apertura nav content
  var $navOpen = false;
  $('.nav_click').click(function(event){
    event.preventDefault();
    var $href = $(this).attr('href');
    if($navOpen == true){
      $('#c2').css({'margin':'0 0 0 50px'})
      return $navOpen = false
    }
    else if($navOpen == false){
      $('#c2').css({'margin':'0 -350px 0 350px'})
      return $navOpen = true
    }
  });
  //termina apertura nav content

  // inicia cambio de layout
  $('#c2-option-bar-layout').on('click', function(){
    $('#c2-content').animate({opacity : [ 0, 'linear' ]}, 200, function(){
      if(readkie('kie_msry_active') == '0'){
        $('#c2-option-bar-layout').css({'background': 'url(css/icon2c.png)no-repeat'})
        $('#c2-content').removeClass('layout').addClass('masonry')
        $('.shot').addClass('msry')
        //re init masonry
        $container.masonry({
          // options
          itemSelector: '.msry',
          columnWidth: 220,
          gutter: 15
        })
        document.cookie = 'kie_msry_active=1;max-age=31536000;path=/';
        return $('#c2-content').animate({opacity : [ 1, 'linear' ]}, 100);
      }
      else{
        $('#c2-option-bar-layout').css({'background': 'url(css/icon1b.png)no-repeat'})
        $('#c2-content').removeClass('masonry').addClass('layout')
        $container.masonry('destroy')
        $('.shot').removeClass('msry')
        document.cookie = 'kie_msry_active=0;max-age=31536000;path=/';
        return $('#c2-content').animate({opacity : [ 1, 'linear' ]}, 100);
      };
    });
  });
  // termina cambio de layout
});
//scroll test function: alert('ventana: ' + $(window).height() + ', cuerpo: ' + $('body').height() + ', scroll: ' + $(window).scrollTop())