export class Coin {
    name: string;
    amount: number;
    animationSwapState: string;
    icon: string;
    iconOutline: string;
};

export class SwapProcess {
    depositCoin : Coin;
    receiveCoin: Coin;
    submitAmount: boolean;
    showQRCode: boolean;
};