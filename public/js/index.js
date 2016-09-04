var createItem = function() {
    $('#productList').addClass('hide');
    $('#saleAdminForm').removeClass('hide');
}

var saleCancelAction = function() {
    $('#productList').removeClass('hide');
    $('#saleAdminForm').addClass('hide');
}

var addProductInCart = function() {

    let productId = $(this.parentElement).attr('productId');
    $.ajax({
        url: '/api/addOrder/' + productId,
        type: 'POST',
        success: function(status) {
            if (status == 'SUCCESS') {
                let originNumber = parseInt($('.cart-number').text());
                let newNumber = originNumber + 1;
                $('.cart-number').text(newNumber.toString());
            } else if (status != 'ERROR') {
                window.location = '/login';
            }
        }
    })
}

var listAllProducts = function() {
    $.ajax({
        url: '/listAll',
        type: 'GET',
        success: function(data) {
            $('#IndexProductList').html(data);
        },
        complete: function() {
            $('.productBuy a').on('click', addProductInCart);
        }
    })
}

$(document).ready(function() {
    listAllProducts();
    $('.saleCreate').on('click', createItem);
    $('.saleCancel').on('click', saleCancelAction);
})