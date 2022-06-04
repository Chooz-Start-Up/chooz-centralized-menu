import { Menu } from "./Menu";

export interface IRestaurant {
  id: string;
  restaurantName: string;
  description: string;
  phoneNumber: string;
  ownerName: string;
  address: string;
  hours: string;
  menus: Menu[];
}

export class Restaurant implements IRestaurant {
  private _id: string;
  private _restaurantName: string;
  private _description: string;
  private _phoneNumber?: string;
  private _ownerName?: string;
  private _address?: string;
  private _hours?: string;
  private _menuBundle?: Menu[] | undefined;

  constructor(id: string, restaurantName: string, description: string) {
    this._id = id;
    this._restaurantName = restaurantName;
    this._description = description;
    this._phoneNumber = undefined;
    this._ownerName = undefined;
    this._address = undefined;
    this._hours = undefined;
  }

  public get id() {
    return this._id;
  }
  public set id(id: string) {
    this._id = id;
  }

  public get restaurantName() {
    return this._restaurantName;
  }
  public set restaurantName(restaurantName: string) {
    this._restaurantName = restaurantName;
  }

  public get description() {
    return this._description;
  }
  public set description(description: string) {
    this.description = description;
  }

  public get phoneNumber(): string {
    return this._phoneNumber!;
  }
  public set phoneNumber(value: string) {
    this._phoneNumber = value;
  }

  public get ownerName(): string {
    return this._ownerName!;
  }
  public set ownerName(value: string) {
    this._ownerName = value;
  }

  public get address(): string {
    return this._address!;
  }
  public set address(value: string) {
    this._address = value;
  }

  public get hours(): string {
    return this._hours!;
  }
  public set hours(value: string) {
    this._hours = value;
  }

  public get menus(): Menu[] {
    return this._menuBundle!;
  }
  public set menus(value: Menu[]) {
    this._menuBundle = value;
  }
}
