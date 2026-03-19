export class Stock {

    constructor(
        public name: string,
        public code: string,
        public price: number,
        public previousPrice: number,
        public favorite: boolean,
        public exchange: string,
        public id?: string
    ) {}
}
