import { Item } from "./Item";

export class Category {
  private _categoryName: string;
  private _items: Item[];

  constructor(categoryName: string = "", items: Item[] = []) {
    this._categoryName = categoryName;
    this._items = items;
  }
  public get categoryName(): string {
    return this._categoryName;
  }
  public set categoryName(value: string) {
    this._categoryName = value;
  }
  public get items(): Item[] {
    return this._items;
  }
  public set items(value: Item[]) {
    this._items = value;
  }

  public static parseCategory(jsonStringObject: string): Category {
    let obj = JSON.parse(jsonStringObject);

    let categoryName = obj.categoryName;
    let items = Item.parseItems(JSON.stringify(obj.items));

    return new Category(categoryName, items);
  }

  public static parseCategories(jsonStringObject: string): Category[] {
    let obj = JSON.parse(jsonStringObject);

    let categories: Category[] = [];

    let keys = Object.keys(obj);
    keys.forEach(function (key: any) {
      let category = Category.parseCategory(JSON.stringify(obj[key]));
      categories.push(new Category(category.categoryName, category.items));
    });

    return categories;
  }
}
