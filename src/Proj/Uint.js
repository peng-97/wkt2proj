class Uint{
    constructor(unit) {
        this.unit_name=Object.values(unit)[0][0]
        // this.unit_value=Object.values(unit)[1]
    };
    unit_list=[
        { "Kilometer" :      "km"    },
        { "Meter" :          "m"     },
        { "Decimeter" :      "dm"    },
        { "Centimeter" :     "cm"    },
        { "Millimeter" :     "mm"    },
        { "Foot_US" :        "us-ft" },
        { "Foot_Gold_Coast" :"us-ft" },
        { "Degree" :         ""      },
    ];
    _get_unit(){
        for (let i = 0; i < this.unit_list.length; i++) {
            let obj=this.unit_list[i];
            if (Object.keys(obj)[0].toLowerCase()===this.unit_name.toLowerCase()){
                return obj[Object.keys(obj)[0]]
            }
        }
        return "Unknown"
    };
    to_proj4(){
        let unit_value=this._get_unit();
        return " +units="+unit_value;
    }
}
export default Uint
