import { Item } from "./Item";

export class Category {
  private _categoryName: string;
  private _items: Item[] | undefined;

  constructor(categoryName: string, items?: Item[], jsonStringObject?: string) {
    this._categoryName = categoryName;

    if (jsonStringObject !== undefined) {
      this.items = this.parseItems(jsonStringObject);
    } else {
      this._items = items;
    }
  }
  public get categoryName(): string {
    return this._categoryName;
  }
  public set categoryName(value: string) {
    this._categoryName = value;
  }
  public get items(): Item[] | undefined {
    return this._items;
  }
  public set items(value: Item[] | undefined) {
    this._items = value;
  }

  private parseItems(jsonStringObject: string): Item[] {
    let obj = JSON.parse(jsonStringObject);

    let items: Item[] = [];

    let keys = Object.keys(obj);
    keys.forEach(function (key: any) {
      items.push(
        new Item(
          undefined,
          undefined,
          undefined,
          undefined,
          JSON.stringify(obj[key])
        )
      );
    });

    return items;
  }
}
