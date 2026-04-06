export interface Stock {
    id?: string;
    name: string;
    code: string;
    price: number;
    previousPrice: number;
    favorite: boolean;
    exchange: string;
}