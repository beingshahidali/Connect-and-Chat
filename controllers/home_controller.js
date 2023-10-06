module.exports.home=function(req,res){
   console.log(req.cookies)
   res.cookie('jordan', 778866)
   return res.render('home')
}