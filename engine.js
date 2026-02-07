// Глобальный объект игры
window.FQ = {
    // 1. Загружаем данные из памяти сразу при инициализации
    money: parseInt(localStorage.getItem('fq_money')) || 0,
    inventory: JSON.parse(localStorage.getItem('fq_inventory')) || [], // Используем fq_inventory везде
    
    // Метод для начисления денег
    addMoney: function(amount) {
        this.money += amount;
        this.save();
        this.updateUI();
        console.log("Деньги начислены. Баланс:", this.money);
    },

    // Метод для покупки
    buyItem: function(itemId, price) {
        // Проверяем: хватает ли денег и нет ли уже этой вещи
        if (this.money >= price && !this.inventory.includes(itemId)) {
            this.money -= price;
            this.inventory.push(itemId);
            this.save();
            this.updateUI();
            return true;
        }
        return false;
    },

    // Метод сохранения данных в браузере
    save: function() {
        localStorage.setItem('fq_money', this.money);
        localStorage.setItem('fq_inventory', JSON.stringify(this.inventory));
    },

    // Обновление интерфейса баланса
    updateUI: function() {
        // Обновляем баланс в самом магазине (id из index.html)
        const shopBalance = document.getElementById('balance-val');
        if (shopBalance) shopBalance.innerText = this.money;

        // Обновляем баланс на слайде Genially, если там есть элементы с этим классом
        const displays = document.querySelectorAll('.fq-balance-text');
        displays.forEach(el => el.innerText = this.money);
    }
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.FQ.updateUI();
});
