export class Item {
  private _itemName: string;
  private _price: Number;
  private _description: string;
  private _ingredients: string;

  constructor(
    itemName: string = "",
    price: Number = 0,
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

  public get price(): Number {
    return this._price;
  }
  public set price(value: Number) {
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

    let itemName = obj._itemName;
    let price = obj._price;
    let description = obj._description;
    let ingredients = obj._ingredients;

    return new Item(itemName, price, description, ingredients);
  }

  public static parseItems(jsonStringObject: string): Item[] {
    let obj = JSON.parse(jsonStringObject);

    let items: Item[] = [];

    let keys = Object.keys(obj);
    keys.forEach(function (key: any) {
      let item = Item.parseItem(JSON.stringify(obj[key]));
      items.push(
        new Item(
          item._itemName,
          item._price,
          item._description,
          item._ingredients
        )
      );
    });

    return items;
  }
}
