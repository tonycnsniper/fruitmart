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
    var promise = $.ajax({
        url: '/api/addOrder/' + productId,
        type: 'POST',
        success: function(status) {
            if (status != 'ERROR' && status != 'SUCCESS') {
                window.location = '/login';
            }
        }
    });

    promise.then(loadCartNumber);
}

var loadCartNumber = function() {
    $.ajax({
        url: '/api/orderListCount',
        type: 'GET',
        success: function(data) {
            if (data !== "NaN" && isNaN(parseInt(data)) === false)
                $('.cart-number').text(data);
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
    loadCartNumber();
    $('.saleCreate').on('click', createItem);
    $('.saleCancel').on('click', saleCancelAction);
})