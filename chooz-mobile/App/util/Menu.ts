import { Category } from "./Category";

export interface IMenu {
  menuName: string;
  categories: Category[] | undefined;
}

export class Menu implements IMenu {
  private _menuName: string;
  private _categories: Category[] | undefined;

  constructor(
    menuName: string,
    categories?: Category[],
    jsonStringObject?: string
  ) {
    console.log("MENU CONSTRUCTOR");
    console.log(jsonStringObject);
    this._menuName = menuName;

    if (jsonStringObject !== undefined) {
      console.log("FUNCTION CALL");
      this.categories = this.parseCategories(jsonStringObject!);
    } else {
      console.log("JSON UNDEFINED");
      this._categories = categories;
    }
  }

  public get menuName(): string {
    return this._menuName;
  }
  public set menuName(value: string) {
    this._menuName = value;
  }

  public get categories(): Category[] | undefined {
    return this._categories;
  }
  public set categories(value: Category[] | undefined) {
    this._categories = value;
  }

  private parseCategories(jsonStringObject: string): Category[] {
    console.log("PARSE CATEGORIES");
    let obj = JSON.parse(jsonStringObject);

    let categories: Category[] = [];

    let keys = Object.keys(obj);
    keys.forEach(function (key: any) {
      let categoryName = obj[key].title;
      categories.push(
        new Category(categoryName, undefined, JSON.stringify(obj[key].Items))
      );
      console.log("PUSHED");
    });

    return categories;
  }
}
