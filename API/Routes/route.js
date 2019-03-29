const express = require('express');
const router = express.Router();

//Model
const Contact = require('../Models/contact');
//Get the Contact List
router.get('/contacts', (req, res, next)=>{

	Contact.find(function(err, contacts)
	{
		res.json(contacts);
	}).limit(5);
});

//Pagination
router.get('/contacts/:page', (req, res, next)=>{

	Contact.find(function(err, contacts)
	{
		res.json(contacts);
	}).skip(Number(req.params.page)).limit(5);

});

//Count the number of rows
router.get('/contact/count', (req, res, next)=>{
	Contact.countDocuments({}, function(err, count){
		res.json(count);
	});
});

//Add the Contact
router.post('/contact', (req, res, next)=>{

	let newContact = new Contact({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		phone: req.body.phone
	}); 

	newContact.save((err, contact)=>{
		if(err)
			res.json({msg: 'Failed to add contact'});
		else
			res.json({msg: 'Contact Added Successfully'});
	});

});

router.delete('/contact/:id', (req, res, next)=>{
	Contact.remove({_id: req.params.id}, function(err, result){
		if(err)
			res.json(err);
		else
			res.json(result);
	});
});

router.get('/contact/search/:search_key', (req, res, next)=>{
	if(req.params.search_key != null){
		Contact.find({ $or:[
			{first_name: { $regex: '.*' + req.params.search_key + '.*' }},
			{last_name: { $regex: '.*' + req.params.search_key + '.*' }},
			{phone: { $regex: '.*' + req.params.search_key + '.*' }}
		]},
		function(err, contacts){
			res.json(contacts);
		}).limit(5);
	}
	else{
		Contact.find({}, function(err, contacts){
			res.json(contacts);
		});
	}
});

router.get('/contact/search', (req, res, next)=>{
	Contact.find(function(err, contacts)
	{
		res.json(contacts);
	}).limit(5);
});

module.exports = router;