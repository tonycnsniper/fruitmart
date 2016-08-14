populateProductList = function(item) {
    $("#productList").append('<div class=\"col-md-4\">' + item.name + '</div>');
}

$(document).ready(function() {
    $.ajax({
        url: '/api/list',
        type: 'GET',
        success: function(products) {
            products.forEach(item => populateProductList(item));
        }
    })
});