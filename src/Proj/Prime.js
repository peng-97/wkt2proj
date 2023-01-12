


class Prime{
    prime_list=["greenwich", "lisbon", "paris", "bogota", "madrid","rome","bern","jakarta","ferro","brussels","stockholm","athens","oslo"]
    constructor(prime) {
        let values=Object.values(prime)[0]
        this.prime_name=values[0];
        this.prime_value=values[1]
    };
    to_proj4(){
        let  str=" +pm="
        if (this.prime_list.find(value => value.toLowerCase()===this.prime_name.toLowerCase())){
            str+=this.prime_name;
        }else{
            str+=this.prime_value
        }
        return str;
    }
}
export default Prime
