class Ellipsoids{
    ellipsoids_list=[
        {
            name:"GRS80",
            data:[6378137.0,298.257222101],
        },
        {
            name:"airy",
            data:[6377563.396,6356256.910],
        },
        {
            name:"bessel",
            data:[6377397.155,299.1528128]
        },
        {
            name:"clrk66",
            data:[6378206.4,6356583.8]
        },
        {
            name:"intl",
            data:[6378388.0,297.0]
        },
        {
            name:"WGS60",
            data:[6378165.0,298.3]
        },
        {
            name:"WGS66",
            data:[6378145.0,298.25]
        },
        {
            name:"WGS72",
            data:[6378135.0,298.26]
        },
        {
            name:"WGS84",
            data:[6378137.0,298.257223563]
        },
        {
            name:"sphere",
            data:[6370997.0,6370997.0]
        }
    ]
    constructor(ellip) {
        let values=Object.values(ellip)[0]
        this.name=values[0]
        this.a=values[1]
        this.rf=values[2]
    }
    to_proj4(){
        if(this.ellipsoids_list.find(value => value.name.toLowerCase()===this.name.toLowerCase())){
            return  " +ellps="+this.name
        }
        let ell=this.ellipsoids_list.find(value => (value.data[0]==this.a) && value.data[1]==this.rf);
        if (ell){
            return " +ellps="+ell.name
        }else{
            return  " +a="+this.a+" +rf="+this.rf
        }
    }
}
export default  Ellipsoids
