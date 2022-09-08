// Bug section fix
let h = $('.blog-4_mask').height();
$('.blog-cards_item').each(function () {
  $('.w-dyn-item .blog-cards_item').height(h);
});
