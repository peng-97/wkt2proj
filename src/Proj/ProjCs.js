 import GeogCs from "./GeogCs";
 import ProjParameter from "./ProjParameter";
 import Uint from "./Uint";
 import Projection from "./Projection";
 const  PKW_PROJCS ="PROJCS";   //投影坐标系
 const  PKW_GEOGCS="GEOGCS";    //地理坐标系
 const  PKW_DATUM="DATUM";    //大地基准面
 const  PKW_SPHEROID ="SPHEROID"; //椭球体定义
 const  PKW_PRIMEM="PRIMEM"; //本初子午线
 const  PKW_UNIT = "UNIT"; //单位
 const  PKW_PROJECTION ="PROJECTION"; //投影类型
 const  PKW_PARAMETER = "PARAMETER";  //投影参数
 const  PKW_AUTHORITY = "AUTHORITY";//权威定义
class ProjCs{
    constructor(projcs) {
        let values=Object.values(projcs)[0]
        this.name=values[0];
        this.params=[];
        for (let i=0;i<values.length;i++){
            if (values[i] instanceof  Object){
                let key=Object.keys(values[i])[0].toUpperCase();
                switch (key){
                    case PKW_GEOGCS:
                        this.geogcs=new GeogCs(values[i]);
                        break;
                    case PKW_PARAMETER:
                        this.params.push(new ProjParameter(values[i]));
                        break
                    case PKW_UNIT:
                        this.unit=new Uint(values[i]);
                        break
                    case PKW_PROJECTION:
                        this.proj=new Projection(values[i]);
                        break;
                }

            }
        }
        // this.name=name;
        // this.geogcs=new GeogCs(geogcs);
        // this.proj=new Projection(proj);
        // this.params=params.map(value => {
        //     return new ProjParameter(value)
        // })
        // this.unit=new Uint(unit);
    }
    to_proj4(){
        let params=this.params.map(value => {
            return value.to_proj4()
        }).join(" ")
        return "+proj="+this.proj.to_proj4()+this.geogcs.to_proj4(true)+params+this.unit.to_proj4()
    }
}
 export default  ProjCs
