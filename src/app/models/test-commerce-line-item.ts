import { ICommerceLineItem } from "./i-commerce-line-items";
import { IPurchased } from "./i-purchased";

export class TestCommerceLineItem implements ICommerceLineItem {
    purchased_entity: IPurchased;

}