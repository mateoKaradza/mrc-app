export function calculateOrder(items) {
    let total = 0;
	let inventoryCost = 0;
	let grossTotal = 0;
	let counter = 0;
    let quantity = 0;

    if (items[0] === undefined)
        return;

    items.forEach(function(product) {
        quantity += product.quantity;
        counter++;
        total += product.price * product.quantity
		inventoryCost += product.inventory_cost * product.quantity
        switch (counter) {
            case 1:
                if (product.quantity === 1)
					grossTotal += product.first_stone_earning;
				else if (product.quantity === 2) {
					grossTotal += product.first_stone_earning + product.second_stone_earning;
					counter = 2;
                } else if (product.quantity === 3 && counter === 1) {
					grossTotal += product.first_stone_earning + product.second_stone_earning + product.third_stone_earning;
					counter = 4;
				} else
					grossTotal += product.first_stone_earning + product.second_stone_earning + (product.third_stone_earning*(product.quantity-2));
                break;
            case 2:
                if (product.quantity === 1)
					grossTotal += product.second_stone_earning;
				else if (product.quantity === 2)
					grossTotal += product.second_stone_earning + product.third_stone_earning;
				else
					grossTotal += product.second_stone_earning + (product.third_stone_earning*(product.quantity-1));
                break;
            default:
                grossTotal += product.third_stone_earning*product.quantity;
                break;
        }
    }, this);

    total = total.toFixed(2);
    inventoryCost = inventoryCost.toFixed(2);
    grossTotal = grossTotal.toFixed(3);

    const result = {total, inventoryCost, grossTotal, quantity};

    return result;
		
}