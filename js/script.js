document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceContainer = document.querySelector('.total-price');
    const cartCountContainer = document.querySelector('.cart-count');

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-name');
            const productPrice = parseFloat(button.getAttribute('data-price'));

            const existingItem = cart.find(item => item.name === productName);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                const cartItem = {
                    name: productName,
                    price: productPrice,
                    quantity: 1
                };
                cart.push(cartItem);
            }
            updateCart();
        });
    });

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;
        let itemCount = 0;

        cart.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                        ${item.name} - ${item.price} x ${item.quantity} 
                        <button class="increase" data-index="${index}">+</button>
                        <button class="decrease" data-index="${index}">-</button>
                        <button class="remove" data-index="${index}">x</button>
                    `;
            cartItemsContainer.appendChild(listItem);
            totalPrice += item.price * item.quantity;
            itemCount += item.quantity;
        });

        totalPriceContainer.textContent = totalPrice.toFixed(2);
        cartCountContainer.textContent = itemCount;

        document.querySelectorAll('.increase').forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                cart[index].quantity += 1;
                updateCart();
            });
        });

        document.querySelectorAll('.decrease').forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                } else {
                    cart.splice(index, 1);
                }
                updateCart();
            });
        });

        document.querySelectorAll('.remove').forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                cart.splice(index, 1);
                updateCart();
            });
        });
    }
});
