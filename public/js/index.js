var createItem = function() {
    $('#productList').addClass('hide');
    $('#saleAdminForm').removeClass('hide');
}

$(document).ready(function() {
    $('.saleCreate').on('click', createItem);
})