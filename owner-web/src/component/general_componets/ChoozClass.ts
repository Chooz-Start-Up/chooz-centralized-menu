import React from 'react';


class User {
    private id: string;
    private pw: string;
    private email: string;
    private name: string

    constructor(id: string, pw: string, email: string, name: string) {
        this.id = id;
        this.pw = pw;
        this.email = email;
        this.name = name;
    }
}

class Owner extends User {
    private resaurant: Restaurant;

    constructor(id: string, pw: string, email: string, name: string, 
                resaurant: Restaurant) {
        super(id, pw, email, name);
        this.resaurant = resaurant;
    }
}

class Restaurant {
    private name: string;
    private menus: Menu[];
    private description: string;
    private address: string;
    private hours: string[];  

    constructor(name: string, menus: Menu[], description: string, address: string, hours: string[]) {
        this.name = name;
        this.menus = menus;
        this.description = description;
        this.address = address;
        this.hours = hours;
    }
}

class Menu {
    private title: string;
    private categories: Category[];

    constructor(title: string, categories: Category[]) {
        this.title = title;
        this.categories = categories;
    }
}

class Category {
    private title: string;
    private items: Item[];

    constructor(title: string, items: Item[]) {
        this.title = title;
        this.items = items;
    }
}

class Item {
    private name: string;
    private price: number;
    private description: string;
    private ingredients: string[];

    constructor(name: string, price: number, description: string, ingredients: string[]) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.ingredients = ingredients;
    }
}