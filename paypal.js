function initPayPal(total) {
    //clear container content
    $("#paypal-button-container").empty();

    paypal.Buttons({
        style: {
            color: 'gold',
            shape: 'pill',
            layout: 'vertical'
        },
        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: total
                    }
            }]
            });
        },
        onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
            //redirect to failure page
            /* window.location.replace("lena t7ot lien page reussite"); */
            alert("payment done!");

            })
        },
        onCancel: function (data) {
            //redirect to failure page
            window.location.replace("lena t7ot lien page echec");
        }
    }).render('#paypal-button-container');
}
