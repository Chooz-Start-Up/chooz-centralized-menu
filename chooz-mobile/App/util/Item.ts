export class Item {
  private _itemName?: string | undefined;
  private _price?: Number | undefined;
  private _description?: string | undefined;
  private _ingredients?: string | undefined;

  constructor(
    itemName?: string,
    price?: Number,
    description?: string,
    ingredients?: string,
    jsonStringObject?: string
  ) {
    if (jsonStringObject === undefined) {
      this._itemName = itemName;
      this._price = price;
      this._description = description;
      this._ingredients = ingredients;
    } else {
      this.parseItem(jsonStringObject);
    }
  }

  public get itemName(): string | undefined {
    return this._itemName;
  }
  public set itemName(value: string | undefined) {
    this._itemName = value;
  }

  public get price(): Number | undefined {
    return this._price;
  }
  public set price(value: Number | undefined) {
    this._price = value;
  }

  public get description(): string | undefined {
    return this._description;
  }
  public set description(value: string | undefined) {
    this._description = value;
  }

  public get ingredients(): string | undefined {
    return this._ingredients;
  }
  public set ingredients(value: string | undefined) {
    this._ingredients = value;
  }

  private parseItem(jsonStringObject: string) {
    let obj = JSON.parse(jsonStringObject);

    this._itemName = obj["title"];
    this._price = obj.price;
    this._description = obj.description;
    this._ingredients = obj.ingredients;
  }
}
