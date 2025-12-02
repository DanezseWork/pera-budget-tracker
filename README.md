<p align="center">
  <a href="https://laravel.com" target="_blank">
    <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="300" alt="Laravel Logo">
  </a>
</p>

<h1 align="center">Pera Budget Tracker</h1>
<p align="center">A personal budget tracking application built with Laravel Breeze.</p>

<p align="center">
  <a href="https://github.com/DanezseWork/pera-budget-tracker/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
  <a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
  <a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-green" alt="License"></a>
</p>

## About

**Pera Budget Tracker** helps you manage personal finances by tracking income, expenses, and savings. It provides an easy-to-use interface and useful features to help you understand and plan your budget.

### Features

-   Track income and expenses
-   Categorize transactions
-   Filter by date ranges (`dateStart` and `dateEnd`)
-   View totals for income and expenses
-   Responsive table views for transactions
-   Toast notifications for dynamic API messages

### Technology Stack

-   **Backend:** Laravel PHP framework
-   **Frontend:** Laravel Breeze with Blade templates
-   **Database:** MySQL / MariaDB (or any supported by Laravel)

## Getting Started

1. Clone the repository and install dependencies:

```bash
git clone https://github.com/DanezseWork/pera-budget-tracker.git
```

2. Install dependencies:

```bash
composer install
npm install
```

3. Run database migrations:

```bash
php artisan migrate
```

4. Start the development server:

```bash
php artisan serve
```

Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the app. Please make sure your code follows the project's coding standards and is tested.
