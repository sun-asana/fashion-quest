window.FQ = {
    money: parseInt(localStorage.getItem('fq_money')) || 0,
    inventory: JSON.parse(localStorage.getItem('fq_inventory')) || [],
    
    addMoney: function(amount) {
        this.money += amount;
        this.save();
        this.updateUI();
    },

    buyItem: function(itemId, price) {
        if (this.money >= price && !this.inventory.includes(itemId)) {
            this.money -= price;
            this.inventory.push(itemId);
            this.save();
            this.updateUI();
            return true;
        }
        return false;
    },

    save: function() {
        localStorage.setItem('fq_money', this.money);
        localStorage.setItem('fq_inventory', JSON.stringify(this.inventory));
    },

    updateUI: function() {
        const bal = document.getElementById('balance-val');
        if (bal) bal.innerText = this.money;
    }
};

document.addEventListener('DOMContentLoaded', () => window.FQ.updateUI());
