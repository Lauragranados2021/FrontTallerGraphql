const router=require('express').Router()
const path=require('path')

router.get('/',(req,res)=>
    res.sendFile(path.join(__dirname,'../views/index.html'))
);
router.get('/oficinas',(req,res)=>
    res.sendFile(path.join(__dirname,'../views/oficinas.html'))
);
router.get('/contrato',(req,res)=>
    res.sendFile(path.join(__dirname,'../views/contrato.html'))
);
module.exports=router;