//
// let wkt='GEOGCS["GCS_China_Geodetic_Coordinate_System_2000",\n' +
//     '    DATUM["D_China_2000",\n' +
//     '        SPHEROID["CGCS2000",6378137.0,298.257222101]],\n' +
//     '    PRIMEM["Greenwich",0.0],\n' +
//     '    UNIT["Degree",0.0174532925199433]]'
// 将wkt转换为json
// function  wkt_to_json(wkt){
//      if (!wkt) return;
//       let count=wkt.length;
//       let parser_str="";
//      for (let i = 0; i < wkt.length; i++) {
//             let char=wkt[i];
//             if (char =="[" ){
//                   char=":[{"
//             }
//             else if (char=="]"){
//                  char="}]"
//             }else  if (char =="\,"){
//                  char="},{"
//             }
//             parser_str+=char;
//      }
//      let left_list=[];
//      let remove_list=[];
//      for (let i = 0; i < parser_str.length; i++) {
//            let char=parser_str[i];
//            if (char == "{"){
//                 left_list.push(i)
//            }else  if (char=="}" && left_list.length>0){
//                  let substr=parser_str.substring(left_list[left_list.length-1],i);
//                  if (!substr.includes(":")){
//                      remove_list=remove_list.concat([left_list[left_list.length-1],i])
//                      left_list=[];
//                  }
//            }
//      }
//      let result_str = "";
//      for (let i = 0; i < parser_str.length; i++) {
//           if(!remove_list.includes(i)){
//                result_str+=parser_str[i]
//           }
//      }
//      console.dir(eval(result_str))
// }

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
export  default  to_proj4
