const express = require('express');
const members = require("../../Members");
const uuid = require("uuid");
const router = express.Router();

//GEt all members  replace/api/members with '/'
router.get('/', (req,res) => {
    res.json(members);
})

//GEt single member
router.get('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({msg: `No member with id ${req.params.id}`})
  }
  
})

//Create Members POST request
router.post('/', (req, res) => {
    // res.send(req.body); // res.send(req.body) => to get the body of request (when use body pharser)
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if (!newMember.name || !newMember.email) {
        return res.status(400).json({msg: 'Please include a name and email'});
    }
    //members.save(newMember) for saving in database // similar syntaz 
    members.push(newMember);
    // res.json(members); // we dont do normally
    res.redirect('/');
});

//Update   PUT requesst
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
      const updMember = req.body;
      members.forEach(member => {
          if (member.id === parseInt(req.params.id)) {
              member.name = updMember.name ? updMember.name : member.name;
              member.email = updMember.email ? updMember.email : member.email;

              res.json({msg: 'Member Updated', member})
          }
      });
    } else {
      res.status(400).json({msg: `No member with id ${req.params.id}`})
    }
    
  })

//Delete member Delete Request
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
      res.json({msg: 'Member Deleted', members: members.filter(member => member.id!== parseInt(req.params.id))});
    } else {
      res.status(400).json({msg: `No member with id ${req.params.id}`})
    }
    
  })

module.exports = router;