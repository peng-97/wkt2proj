
const  PKW_PROJCS ="PROJCS";   //投影坐标系
const  PKW_GEOGCS="GEOGCS";    //地理坐标系
const  PKW_DATUM="DATUM";    //大地基准面
const  PKW_SPHEROID ="SPHEROID"; //椭球体定义
const  PKW_PRIMEM="PRIMEM"; //本初子午线
const  PKW_UNIT = "UNIT"; //单位
const  PKW_PROJECTION ="PROJECTION"; //投影类型
const  PKW_PARAMETER = "PARAMETER";  //投影参数
const  PKW_AUTHORITY = "AUTHORITY";//权威定义



import ProjCs from "./ProjCs";
import GeogCs from "./GeogCs";
class Cs{
    constructor(wkt_json) {
        this.wkt_json=wkt_json
        this.init()
    }
    get_geogcs(value){
        let values=Object.values(value)[0]
        return new GeogCs(values[0],values[1],values[2])
    }
    get_proj(value){
        let values=Object.values(value)[0]
        let  prj_name=values[0];
        let proj_parma=[];
        let geocs=""
        let unit="";
        let proj=""
        for (let i=0;i<values.length;i++){
            if (values[i] instanceof  Object){
                let key=Object.keys(values[i])[0].toUpperCase();
                switch (key){
                    case PKW_GEOGCS:
                        geocs=values[i]
                    case PKW_PARAMETER:
                        proj_parma.push(values[i])
                        break
                    case PKW_UNIT:
                        unit=values[i];
                        break
                    case PKW_PROJECTION:
                        proj=values[i];
                        break;
                }

            }
        }
        return new ProjCs(prj_name,geocs,proj,proj_parma,unit)
    }
    init(){
        this.type=Object.keys(this.wkt_json)[0].toUpperCase();
        if (Object.keys(this.wkt_json)[0].toUpperCase()===PKW_PROJCS){
            this.cs=this.get_proj(this.wkt_json)
        }else{
            this.cs=this.get_geogcs(this.wkt_json)
        }

    }
    to_proj4(){
        return this.cs.to_proj4()+" +no_defs +type=crs"
    }
}
export default Cs
