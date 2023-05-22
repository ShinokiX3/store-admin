export interface IProduct {
	_id: string;
	code: string;
	title: string;
	description: string;
	picture: string;
	cost: number;
	discount: number;
	inStockQuantity: 5;
	category: string[];
	__v: number;
}

export interface IAttribute {
	_id: string;
	value: string;
}
