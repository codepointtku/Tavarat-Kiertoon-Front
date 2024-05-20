//tells typescript that all png files in this folder is type any
declare module '*.png' {
    const value: any;
    export = value;
}
