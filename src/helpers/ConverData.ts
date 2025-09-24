import type { chartType } from "../components/modules/Chart";


export const ConverData = (data : any , type : chartType) => {
    const convertedData = data[type].map((item : Array<number>) => {
        return {
            date : item[0] ,
            [type] : item[1]
        }
    })
    return convertedData
}