const functions = require('firebase-functions');
const admin = require('firebase-admin');
const db = admin.firestore();



exports.sendSingleFormToServer = functions.https.onRequest(async (req, res) => {
    console.log(req.body);
    let data = req.body;
    try {
        await db.collection("forms").doc().set(data);
        res.send({
            isSuccess: true,
            directory: "remote"
        })
    } catch (error) {
        console.log(error)
        res.send({
            "message": "Internal Error",
            isSuccess: false

        })
    }
});

exports.sendMultipleDataToServer = functions.https.onRequest(async (req, res) => {
    console.log(req.body);
    let listToSaveInServer = req.body;
    let promiseArray = [];

    listToSaveInServer.forEach((e) => {
        promiseArray.push(setDataToServer(e));
    });
    await Promise.all(promiseArray);
    console.log("promis array ", promiseArray);
    res.send({
        isSuccess: true,
        directory: "remote",
        message:"Data Successfully sent to remote Server"
    });

});


async function setDataToServer(data) {
    await db.collection("forms").doc().set(data);
    return;

}