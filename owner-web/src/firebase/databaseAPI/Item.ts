export class Item {
  private _itemName: string;
  private _price: number;
  private _description: string;
  private _ingredients: string;

  constructor(
    itemName: string = "",
    price: number = 0,
    description: string = "",
    ingredients: string = ""
  ) {
    this._itemName = itemName;
    this._price = price;
    this._description = description;
    this._ingredients = ingredients;
  }

  public get itemName(): string {
    return this._itemName;
  }
  public set itemName(value: string) {
    this._itemName = value;
  }

  public get price(): number {
    return this._price;
  }
  public set price(value: number) {
    this._price = value;
  }

  public get description(): string {
    return this._description;
  }
  public set description(value: string) {
    this._description = value;
  }

  public get ingredients(): string {
    return this._ingredients;
  }
  public set ingredients(value: string) {
    this._ingredients = value;
  }

  public static parseItem(jsonStringObject: string): Item {
    let obj = JSON.parse(jsonStringObject);

    let itemName = obj["itemName"];
    let price = obj.price;
    let description = obj.description;
    let ingredients = obj.ingredients;

    return new Item(itemName, price, description, ingredients);
  }

  public static parseItems(jsonStringObject: string): Item[] {
    let obj = JSON.parse(jsonStringObject);

    let items: Item[] = [];

    let keys = Object.keys(obj);
    keys.forEach(function (key: any) {
      let item = Item.parseItem(JSON.stringify(obj[key]));
      items.push(
        new Item(item.itemName, item.price, item.description, item.ingredients)
      );
    });

    return items;
  }
}
