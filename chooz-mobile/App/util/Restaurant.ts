export interface IRestaurant {
  id: string;
  restaurantName: string;
  description: string;
}

export class Restaurant implements IRestaurant {
  private _id: string;
  private _restaurantName: string;
  private _description: string;

  constructor(id: string, restaurantName: string, description: string) {
    this._id = id;
    this._restaurantName = restaurantName;
    this._description = description;
  }

  public set id(id: string) {
    this._id = id;
  }

  public get id() {
    return this._id;
  }

  public set restaurantName(restaurantName: string) {
    this._restaurantName = restaurantName;
  }

  public get restaurantName() {
    return this._restaurantName;
  }

  public set description(description: string) {
    this.description = description;
  }

  public get description() {
    return this._description;
  }
}
