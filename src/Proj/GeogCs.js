import Datum from "./Datum";
import Prime from "./Prime";
class GeogCs{
    constructor(geogcs) {
        let values=Object.values(geogcs)[0];
        this.name=values[0];
        this.datum=new Datum(values[1]);
        this.prime_mer=new Prime(values[2]);
        // this.angunit=angunit;
        // this.twin_ax=twin_ax;
    }
    _get_geo_proj4(){
        return this.datum.to_proj4()+this.prime_mer.to_proj4()
    }
    to_proj4(isPro=false){
        let str_proj=this._get_geo_proj4()
        if (isPro){
            return str_proj
        }else {
            return  "+proj=longlat"+str_proj
        }

    }
}
export default GeogCs
