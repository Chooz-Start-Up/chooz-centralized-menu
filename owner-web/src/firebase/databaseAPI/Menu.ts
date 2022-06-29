import { Category } from "./Category";

export interface IMenu {
  menuName: string;
  categories: Category[] | undefined;
}

export class Menu implements IMenu {
  private _menuName: string;
  private _categories: Category[];

  constructor(menuName: string = "", categories: Category[] = []) {
    this._menuName = menuName;
    this._categories = categories;
  }

  public get menuName(): string {
    return this._menuName;
  }
  public set menuName(value: string) {
    this._menuName = value;
  }

  public get categories(): Category[] {
    return this._categories;
  }
  public set categories(value: Category[]) {
    this._categories = value;
  }

  public static parseMenu(jsonStringObject: any): Menu {
    let obj = JSON.parse(jsonStringObject);

    let menuName = obj._menuName;
    let categories = Category.parseCategories(JSON.stringify(obj._categories));

    return new Menu(menuName, categories);
  }

  public static parseMenus(jsonStringObject: any): Menu[] {
    let obj = JSON.parse(jsonStringObject);

    let menus: Menu[] = [];

    let keys = Object.keys(obj);
    keys.forEach(function (key: any) {
      let menu = Menu.parseMenu(JSON.stringify(obj[key]));
      menus.push(new Menu(menu.menuName, menu._categories));
    });

    return menus;
  }
}
