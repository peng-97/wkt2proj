//
// let wkt='GEOGCS["GCS_China_Geodetic_Coordinate_System_2000",\n' +
//     '    DATUM["D_China_2000",\n' +
//     '        SPHEROID["CGCS2000",6378137.0,298.257222101]],\n' +
//     '    PRIMEM["Greenwich",0.0],\n' +
//     '    UNIT["Degree",0.0174532925199433]]'
import Cs from "./Proj/Cs";
//获取wkt类型
function get_wkt_type(data){
     let key=data.keys[0];
     //
      let geo_gcs_content=null
     if (key.toUpperCase()=="PROJCS")//投影坐标系
     {
         geo_gcs_content=data[key][1][data[key][1].keys[0]]
     }else{
         geo_gcs_content=data[key]
     }
     let datum_content=geo_gcs_content[geo_gcs_content.keys[0]]
    let datum_name = datum_content[0].toUpperCase().trim('"')
    if (datum_name.startsWith("D_"))
        return  "esri"
    else {
        return  "ogc"
    }
}


//wkt 转换为json格式
function bracket_to_json(wkt,index=0){
    let bracket_list=[];
    let  key='';
    for (let i = index; i < wkt.length; i++) {
        let char=wkt[i];
        if (char=="["){
            let obj={};
            let result=bracket_to_json(wkt,i+1);
            obj[key]=result[0];
            bracket_list.push(obj);
            i = result[1];
            key='';
        }else if (char == "\,"){
            if (key) {
                bracket_list.push(key);
                key = '';
            }
        }else if (char == "]"){
            if (key){
                bracket_list.push(key);
            }
            return [bracket_list,i];
        }else{
            if (char!="\"" &&  char!="\'" && char!=' ' && char!="\n"){
                key+=char
            }
        }
    }
    return  bracket_list[0];
}

function  to_proj4(str){
    let wkt_json=bracket_to_json(str)
    let cs=new Cs(wkt_json)
    return cs.to_proj4()
}

export  default {to_proj4}
// module.exports= {to_proj4}
