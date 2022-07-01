import { Item } from "./Item";

export class Category {
  private _categoryName: string;
  private _description: string;
  private _items: Item[];

  constructor(
    categoryName: string = "",
    description: string = "",
    items: Item[] = []
  ) {
    this._categoryName = categoryName;
    this._description = description;
    this._items = items;
  }
  public get categoryName(): string {
    return this._categoryName;
  }
  public set categoryName(value: string) {
    this._categoryName = value;
  }
  public get description(): string {
    return this._description;
  }
  public set description(value: string) {
    this._description = value;
  }
  public get items(): Item[] {
    return this._items;
  }
  public set items(value: Item[]) {
    this._items = value;
  }

  public static parseCategory(jsonStringObject: string): Category {
    let obj = JSON.parse(jsonStringObject);

    let categoryName = obj._categoryName;
    let description = obj._description;
    let items = Item.parseItems(JSON.stringify(obj._items));

    return new Category(categoryName, description, items);
  }

  public static parseCategories(jsonStringObject: string): Category[] {
    let obj = JSON.parse(jsonStringObject);

    let categories: Category[] = [];

    let keys = Object.keys(obj);
    keys.forEach(function (key: any) {
      let category = Category.parseCategory(JSON.stringify(obj[key]));
      categories.push(
        new Category(
          category._categoryName,
          category._description,
          category._items
        )
      );
    });

    return categories;
  }
}
