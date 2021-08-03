(function($) {

    $(document).ready(function() {
        //initialiser un Objet de type CART
        CART.init();

        //update cart qty on each refresh
        $("#count").text(" " + CART.total_qty());

        //display items in shopping cart
        CART.displayProds();


        //add to cart button
        $(".add-cart").on('click', function(e) {
            e.preventDefault();
            //get button parent card
            var parent_card = $(this).closest(".card");
            //attribut src
            var img = parent_card.find("img").attr("src");
            var nom_produit = parent_card.find("h1").text();
            var prix = parent_card.find(".price").text();

            //add product to cart
            CART.add(nom_produit, img, prix);
            //update cart qty
            $("#count").text(" " + CART.total_qty());

        });

        //decrease quantity button
        $('.minus-btn').on('click', function(e) {
            e.preventDefault();
            var $this = $(this);
            var $input = $this.closest('div').find('input');
            var tag = $this.closest('.item').find('.tag').text();
            var value = parseInt($input.val());

            if (value > 1) {
                value -= 1;
                $input.val(value);
                //lena appel reduce(tag);
                CART.reduce(tag, 1);
                $("#count").text(" " + CART.total_qty());

                //update total price
                $('#total').text(CART.total_price());
            }
        });

        //increase quantity button
        $('.plus-btn').on('click', function(e) {
            e.preventDefault();
            var $this = $(this);
            var $input = $this.closest('div').find('input');
            var tag = $this.closest('.item').find('.tag').text();
            var value = parseInt($input.val());

            value += 1;
            $input.val(value);
            CART.increase(tag, 1);
            $("#count").text(" " + CART.total_qty());

            //update total price
            $('#total').text(CART.total_price());
        });

        //like item button
        $('.like-btn').on('click', function() {
            $(this).toggleClass('is-active');
        });

        //remove item button
        $('.delete-btn').on('click', function(e) {
            e.preventDefault();
            var $this = $(this);
            var tag = $this.closest('.item').find('.tag').text();
            //remove item from locaStorage
            CART.remove(tag);
            //remove item from shopping cart HTML
            $this.closest('.item').remove();
            //update cart count
            $("#count").text(" " + CART.total_qty());

            //update total price
            $('#total').text(CART.total_price());

            //check if cart is empty
            if (CART.total_qty() == 0) {
                $('.shopping-cart').empty();
                $('.shopping-cart').append('<div class="title">Empty cart!</div>');
            }

        });

        
        // When the user clicks on <span> (x), close the modal
        $("#myModal .close").click(function(e) {
            $("#myModal").hide();
        });

        //checkout button click
        $("#checkout").click(function(e) {
            //create paypal button
            initPayPal(CART.total_price());
            //show new window
            $("#myModal").show();
        });


});

})(jQuery);