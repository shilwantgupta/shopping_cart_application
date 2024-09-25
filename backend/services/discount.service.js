class DiscountEngine {
  constructor(items) {
    this.items = items;
    this.discountsApplied = [];
    this.total = 0;
  }

  calculateTotal() {
    let subtotal = 0;
    let totalDiscount = 0;

    // Calculate subtotal and prepare for discounts
    for (let item of this.items) {
      if (item.quantity > item.product.stock) {
        throw new Error(`Insufficient stock for ${item.product.title}`);
      }
      subtotal += item.product.price * item.quantity;
    }

    // Apply discounts
    totalDiscount += this.applyBuyXGetYFree();
    totalDiscount += this.applyTieredPricing();
    totalDiscount += this.applyPercentageDiscount(subtotal);

    this.total = subtotal - totalDiscount;

    return { total: this.total, discountsApplied: this.discountsApplied };
  }

  applyBuyXGetYFree() {
    let totalDiscount = 0;

    this.items.forEach((item) => {
      if (item.product.category === 'Electronics') {
        const freeItems = Math.floor(item.quantity / 3);
        if (freeItems > 0) {
          const discount = freeItems * item.product.price;
          totalDiscount += discount;
          this.discountsApplied.push(
            `Buy 3 get 1 free applied for ${item.product.title}: -$${discount}`
          );
        }
      }
    });

    return totalDiscount;
  }

  applyTieredPricing() {
    let totalDiscount = 0;

    this.items.forEach((item) => {
      if (item.quantity >= 20) {
        const discount = item.product.price * item.quantity * 0.3;
        totalDiscount += discount;
        this.discountsApplied.push(
          `Tiered pricing (30%) applied for ${item.product.title}: -$${discount}`
        );
      } else if (item.quantity >= 10) {
        const discount = item.product.price * item.quantity * 0.2;
        totalDiscount += discount;
        this.discountsApplied.push(
          `Tiered pricing (20%) applied for ${item.product.title}: -$${discount}`
        );
      }
    });

    return totalDiscount;
  }

  applyPercentageDiscount(subtotal) {
    let totalDiscount = 0;

    if (subtotal > 100) {
      const discount = subtotal * 0.1;
      totalDiscount += discount;
      this.discountsApplied.push(
        `10% percentage discount applied: -$${discount}`
      );
    }

    return totalDiscount;
  }
}

export default DiscountEngine;
