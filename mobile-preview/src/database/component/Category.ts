import { Item } from "./Item";

export class Category {
  private _categoryName: string;
  private _items: Item[];
  private _description: string;

  constructor(
    categoryName: string = "",
    items: Item[] = [],
    description: string
  ) {
    this._categoryName = categoryName;
    this._items = items;
    this._description = description;
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
  public get description(): string {
    return this._description;
  }
  public set description(value: string) {
    this._description = value;
  }

  public static parseCategory(jsonStringObject: string): Category {
    let obj = JSON.parse(jsonStringObject);

    let categoryName = obj.categoryName;
    let description = obj.description;
    let items = Item.parseItems(JSON.stringify(obj.items));

    return new Category(categoryName, items, description);
  }

  public static parseCategories(jsonStringObject: string): Category[] {
    let obj = JSON.parse(jsonStringObject);

    let categories: Category[] = [];

    let keys = Object.keys(obj);
    keys.forEach(function (key: any) {
      let category = Category.parseCategory(JSON.stringify(obj[key]));
      categories.push(
        new Category(
          category.categoryName,
          category.items,
          category.description
        )
      );
    });

    return categories;
  }
}
