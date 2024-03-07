// 服务器全接口返回数据类型
export interface ResponseData {
    code: number;
    ok: boolean;
    message: string;
}
//SPU数据的ts类型:需要修改
export interface SpuData {
    category3Id: string | number,
    id?: number,
    spuName: string,
    tmId: number | string,
    description: string,
    spuImageList: null | SpuImg[]
    spuSaleAttrList: null | SaleAttr[],

}
//数组:元素都是已有SPU数据类型
export type Records = SpuData[];
//定义获取已有的SPU接口返回的数据ts类型
export interface HasSpuResponseData extends ResponseData {
    data: {
        records: Records,
        total: number,
        size: number,
        current: number,
        searchCount: boolean,
        pages: number
    }
}

//商品图片的ts类型
export interface SpuImg {
    id?: number,
    imgName?: string,
    imgUrl?: string
    createTime?: string,
    updateTime?: string,
    spuId?: number,
    name?: string,
    url?: string

}
//销售属性对象ts类型
export interface SaleAttr {
    id?: number,
    createTime?: null,
    updateTime?: null,
    spuId?: number,
    baseSaleAttrId: number | string,
    saleAttrName: string,
    spuSaleAttrValueList: SpuSaleAttrValueList
    flag?: boolean,
    saleAttrValue?: string,
}
//已有的销售属性值对象ts类型
export interface SaleAttrValue {
    id?: number,
    createTime?: null,
    updateTime?: null,
    spuId?: number,
    baseSaleAttrId: number | string,
    saleAttrValueName: string,
    saleAttrName?: string,
    isChecked?: null
}
//存储已有的销售属性值数组类型
export type SpuSaleAttrValueList = SaleAttrValue[];