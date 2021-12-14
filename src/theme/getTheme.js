import theme from './theme';
export default function (theme_name){
    if(localStorage.getItem("casper_theme")){
       const theme_name = localStorage.getItem("casper_theme");
       if(theme[theme_name]){
         return theme[theme_name];
       }
       else{
          return theme.light;
       }
       
    }
    else{
      return theme.light;
    }
}