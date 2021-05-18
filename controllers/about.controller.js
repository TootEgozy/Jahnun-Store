const { getMaxListeners } = require('../models/about.model');
const aboutModel = require('../models/about.model');

const createAboutModel = async(req, res)=> {
    try {

        const aboutObj = {
            intro: 'inro test',
            product: 'product test',
            policy: 'policy test',
            contact: [
                {phoneNumber: 0505050505},
                {email: 'abcd@gmail.com'},
                {details: 'details test'}
            ]
        }
        const about = new aboutModel(aboutObj);

        await about.save();
        return res.send(about);
    }
    catch(e) {
        return res.status(401);
    }
}

const getAbout = async(req, res)=> {
    
    try {
    
        const about = await aboutModel.find({});
        return res.send(about);
    }
    catch(e) {
    
        return res.status(404).send();
    }
}

const editAbout = async(req, res)=> {
    
    const updates = Object.keys(req.body);
    const allowedUpdates = ['intro', 'product', 'policy', 'contact'];
    
    const indexId = updates.indexOf("id");
    const indexIcon = updates.indexOf("icon");

    updates.splice(indexId, 1);
    updates.splice(indexIcon, 1);

    const isValidOperation = updates.every((update)=> {
        return allowedUpdates.includes(update);
    });

    if(!isValidOperation) {
        return res.status(400).send('Illegal updates');
    }

    const bodyWithoutId = JSON.parse(JSON.stringify(req.body));
    delete bodyWithoutId.id;

    try {
        const about = await aboutModel.findByIdAndUpdate(req.body.id, bodyWithoutId, {new: true, runValidators: true});

        if(!about) {
            return res.status(404).send('about not found');
        }
        return res.send(about);
        
    }
    catch(e) {
        return res.status(400).send(e);
    }
}

const deleteAllAboutModels = async(req, res)=> {
    
    try {

        const aboutModels = await aboutModel.find({});
        
        aboutModels.forEach(async (about)=> {
            await aboutModel.findByIdAndDelete(about._id);
        });

        return res.send(`Deleted ${aboutModels.length} documents`);
    }
    catch(e) {

        return res.status(401).send(e)
    }
}


module.exports = {
    createAboutModel: createAboutModel,
    getAbout: getAbout,
    editAbout: editAbout,
    deleteAllAboutModels: deleteAllAboutModels
}
