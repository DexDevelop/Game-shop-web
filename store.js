if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    //Removing items from the cart
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

}

function removeCartItem(event) {
    var buttonClicked = event.target
            buttonClicked.parentElement.parentElement.remove()
            updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

//Update total in the cart
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0] //Get to where the cart section is
    var cartRows = cartItemContainer.getElementsByClassName('cart-row') //Get each row in the cart section
    var total = 0 //default total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0] //Get where the price stores
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0] //Get where the quantity stores
        var price = parseFloat(priceElement.innerText.replace('$', '')) //replace the '$' so can just get the number for the math
        var quantity = quantityElement.value //Get the value in the quantity section
        total = total + (price * quantity) //Calculate the total
    }
    total = Math.round(total * 100) /100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total //Update the total section
}
