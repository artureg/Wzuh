export declare function Wzuh(mapping?: {
    [key: string]: string;
}): <T extends new (...args: any[]) => {}>(constructor: T) => {
    new (...args: any[]): {};
} & T;
