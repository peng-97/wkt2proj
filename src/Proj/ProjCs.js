 import GeogCs from "./GeogCs";
import Projection from "./Projection";
import ProjParameter from "./ProjParameter";
import Uint from "./Uint";
class ProjCs{
    constructor(name,geogcs,proj,params,unit) {
        this.name=name;
        this.geogcs=new GeogCs(geogcs);
        this.proj=new Projection(proj);
        this.params=params.map(value => {
            return new ProjParameter(value)
        })
        this.unit=new Uint(unit);
    }
    to_proj4(){
        let params=this.params.map(value => {
            return value.to_proj4()
        }).join(" ")
        return " +proj="+this.proj.to_proj4()+this.geogcs.to_proj4(true)+params+this.unit.to_proj4()
    }
}
 export default  ProjCs
