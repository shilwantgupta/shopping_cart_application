class DiscountEngine {
  constructor(items) {
    this.items = items; // Array of { product, quantity }
    this.discountsApplied = [];
    this.total = 0;
  }

  calculateTotal() {
    let subtotal = 0;
    // Calculate initial subtotal
    for (let item of this.items) {
      subtotal += item.product.price * item.quantity;
    }

    // Apply discounts
    this.applyBuyXGetYFree();
    this.applyTieredPricing();
    this.applyPercentageDiscount(subtotal);

    return { total: this.total, discountsApplied: this.discountsApplied };
  }

  applyBuyXGetYFree() {
    // Example: Buy 3 of product A, get 1 free
    this.items.forEach((item) => {
      if (item.product.category === 'A') {
        // Assuming category 'A' is eligible
        const freeItems = Math.floor(item.quantity / 3);
        if (freeItems > 0) {
          const discount = freeItems * item.product.price;
          this.total += item.quantity * item.product.price - discount;
          this.discountsApplied.push(
            `Buy 3 get 1 free applied for ${item.product.name}: -$${discount}`
          );
        } else {
          this.total += item.quantity * item.product.price;
        }
      } else {
        this.total += item.quantity * item.product.price;
      }
    });
  }

  applyTieredPricing() {
    // Example: Buy 10 get 20% off; buy 20 get 30% off
    this.items.forEach((item) => {
      if (item.quantity >= 20) {
        const discount = item.product.price * item.quantity * 0.3;
        this.total -= discount;
        this.discountsApplied.push(
          `Tiered pricing (30%) applied for ${item.product.name}: -$${discount}`
        );
      } else if (item.quantity >= 10) {
        const discount = item.product.price * item.quantity * 0.2;
        this.total -= discount;
        this.discountsApplied.push(
          `Tiered pricing (20%) applied for ${item.product.name}: -$${discount}`
        );
      }
    });
  }

  applyPercentageDiscount(subtotal) {
    // Example: 10% off for orders above $100
    if (subtotal > 100) {
      const discount = subtotal * 0.1;
      this.total -= discount;
      this.discountsApplied.push(
        `10% percentage discount applied: -$${discount}`
      );
    }
  }
}

export default DiscountEngine;
