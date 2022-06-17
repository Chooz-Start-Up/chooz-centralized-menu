import { Menu } from "./Menu";

export interface IRestaurant {
  id: string;
  restaurantName: string;
  description: string;
  isPublished: boolean;
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
  private _isPublished: boolean;
  private _phoneNumber?: string;
  private _ownerName?: string;
  private _address?: string;
  private _hours?: string;
  private _menus?: Menu[];

  constructor(
    id: string = "",
    restaurantName: string = "",
    description: string = "",
    isPublished: boolean = false,
    phoneNumber: string = "",
    ownerName: string = "",
    address: string = "",
    hours: string = "",
    menus: Menu[] = []
  ) {
    this._id = id;
    this._restaurantName = restaurantName;
    this._description = description;
    this._isPublished = isPublished;
    this._phoneNumber = phoneNumber;
    this._ownerName = ownerName;
    this._address = address;
    this._hours = hours;
    this._menus = menus;
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

  public get isPublished(): boolean {
    return this._isPublished;
  }
  public set isPublished(value: boolean) {
    this._isPublished = value;
  }

  public get menus(): Menu[] {
    return this._menus!;
  }
  public set menus(value: Menu[]) {
    this._menus = value;
  }

  public setDetails(jsonStringObject: any) {
    let obj = JSON.parse(jsonStringObject);

    this._phoneNumber = obj.phoneNumber;
    this._ownerName = obj.ownerName;
    this._address = obj.address;
    this._hours = obj.hours;
  }

  public setMenus(jsonStringObject: any) {
    this._menus = Menu.parseMenus(jsonStringObject);
  }

  public static parseRestaurant(jsonStringObject: string): Restaurant {
    let obj = JSON.parse(jsonStringObject);

    let id = obj.id;
    let restaurantName = obj.restaurantName;
    let description = obj.description;
    let phoneNumber = obj.phoneNumber;
    let ownerName = obj.ownerName;
    let address = obj.address;
    let hours = obj.hours;
    let isPublished = obj.isPublished;
    let menus = Menu.parseMenus(JSON.stringify(obj.menus));

    return new Restaurant(
      id,
      restaurantName,
      description,
      phoneNumber,
      ownerName,
      address,
      hours,
      isPublished,
      menus
    );
  }
}
