// 分类相关的ts数据类型
export interface ResponseData{
    code: number;
    ok: boolean;
    message: string;
}
//分类的数据类型
export interface CategoryObj{
    id: number|string;
    name: string;
    category1Id?: number;
    category2Id?: number;
}

//分类接口返回的数据类型
export interface CategoryResponseData extends ResponseData{
    data: CategoryObj[];
}

// 属性对象的ts类型
export interface AttrValue{
    id:number;
    valueName:string;
    attrId:number;
}
//属性对象的ts数组类型
export type AttrValueArr=AttrValue[]
//  属性对象
export interface Attr{
    id:number;
    attrName:string;
    categoryId:number;
    cateGoryLevel:number;
    attrValueList:AttrValueArr;
}
// 存储属性对象的数组
export type AttrList=Attr[]
//属性接口返回的数据类型
export interface AttrResponseData extends ResponseData{
    data: AttrList;

}