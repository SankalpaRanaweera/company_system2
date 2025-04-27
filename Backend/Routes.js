const router = require ("express").Router();
let Dbmodels = require ("./Dbmodels");

router.route("/add").post((req,res)=>{

    const team = req.body.team;
    const date = new Date(req.body.date);
    const Operatorname = req.body.Operatorname;
    const Operatorgrade = req.body.Operatorgrade;
    const Operationname = req.body.Operationname;                
    const Operationgrade = req.body.Operationgrade;
    const adjustedTime = Number(req.body.adjustedTime);
    const piecesPerHour = Number(req.body. piecesPerHour);


    const newone = new Dbmodels({
        team,
        date,
        Operatorname,
        Operatorgrade,
        Operationname,
        Operationgrade,
        adjustedTime,
        piecesPerHour

    });

    newone.save()
    .then(()=>{
        res.json("Added")
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({ status: "error", message: err.message });
    });

});

router.route("/update/:id").put(async (req,res)=>{

    const userid = req.params.id;
    

    const{ team,date, Operatorname, Operatorgrade, Operationname, Operationgrade,  adjustedTime, piecesPerHour}= req.body;


const updateone = {
    team,
    date,
    Operatorname,
    Operatorgrade,
    Operationname,
    Operationgrade,
    adjustedTime,
    piecesPerHour
};
try {
const update=await Dbmodels. findByIdAndUpdate(userid ,updateone, {new:true});

if (!update) {
    return res.status(404).send({ status: "error", message: "Record not found" });
}
res.status(200).send({ status: "user updated", user: update });
} catch (error) {
console.error('Error updating user:', error.message);
res.status(500).send({ status: "error updating user", error: error.message });
}
});


router.route("/delete/:id").delete(async(req,res)=>{
    const userId = req.params.id;
    try{

    await Dbmodels.findByIdAndDelete(userId)
        res.status(200).send({status:"user deleted" });
    }catch(err) {
        console.log(err.message);
        res.status(500).send({status:"error with delete user",error:err.message });
    }
});



router.route("/get").get(async (req, res) => {
    const { team, date } = req.query;
    try {
        const records = await Dbmodels.find({ team: team, date: new Date(date) });
       

        if (records.length === 0) {
            return res.status(404).json({ status: "error", message: "No records found" });
        }
        console.log("check",records); 
        res.status(200).json(records);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "error", error: err.message });
    }
});



    
module.exports = router; 

