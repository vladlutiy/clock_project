$(document).ready(function(){
  $('.carousel__inner').slick({
      speed: 1200, 
      adaptiveHeight: true,
      // autoplay: true,
      autoplaySpeed: 2000,
      fade: false,
      cssEase: 'linear',
      centerMode: false,
      prevArrow: '<button type="button" class="slick-prev"><img src="icon/leftsolid.png"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="icon/rightsolid.png"></button>',
      responsive:[
          {
              breakpoint: 1024,
              settings: {
                arrows: false,
                dots: true
              }
          },
      ]
      
    });

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active ');
  });

  function toggleSlide(item){
    $(item).each(function(i){
      $(this).on('click', function(e){
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      });
    });
  };


  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  //  Modal

  $('[data-modal=consultation]').on('click', function(){
    $('.overlay, #consultation').fadeIn();
  });

  $('.modal__close').on('click', function(){
    $('.overlay, #consultation, #thanks, #order').fadeOut();
  });

  
  $('.button_mini').each(function(i) {
    $(this).on('click', function() {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn();
    });
  });

  // $('#consultation-form').validate();
  // $('#consultation form').validate();
  // $('#order form').validate();

  function validateForms(form){
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 7
        },
        phone: "required",
        email: {
          required: true,
          email: true,
        }
      },
      messages: {
        name: {
          required: "Пожалуйста, впишите свое имя",
          minlength: jQuery.validator.format("Имя должно состоять из {0} букв")
        },
        phone: "Пожалуйста, впишите номер телефона",
        email: {
          required: "Пожалуйста, впишите свой e-mail",
          email: "Ваш  e-mail адресс должен быть формата - name@domain.com"
        }
      }
    });
  }

  validateForms('#consultation-form');
  validateForms('#consultation form');
  validateForms('#order form');

  $('input[name=phone]').mask("+ 48 (999) 999 999");

  $('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
    });
    return false;
  });

  $(window).scroll(function(){
    if ($ (this).scrollTop() > 1600) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });

  $("a[href=#up]").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
  });

  new WOW().init();

});
