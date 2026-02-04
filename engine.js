// Глобальный объект игры
window.FQ = {
    money: parseInt(localStorage.getItem('fq_money')) || 0,
    inventory: JSON.parse(localStorage.getItem('fq_items')) || [],
    
    // Метод для начисления денег
    addMoney: function(amount) {
        this.money += amount;
        this.save();
        this.updateUI();
    },

    // Метод для покупки
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
        localStorage.setItem('fq_items', JSON.stringify(this.inventory));
    },

    updateUI: function() {
        // Обновляем текст с балансом на слайде, если он есть
        const displays = document.querySelectorAll('.fq-balance-text');
        displays.forEach(el => el.innerText = this.money);
    }
};

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    window.FQ.updateUI();
});
