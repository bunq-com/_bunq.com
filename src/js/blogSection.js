// Bug section fix
let h = $('.blog-slider_mask').height();
$('.blog-card_component').each(function () {
  $('.w-dyn-item .blog-card_component').height(h);
});
